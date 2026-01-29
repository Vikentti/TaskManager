import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { tokenServices } from "@/shared/lib/services/token.services";
import { ErrorResponse } from "@/shared/types/ErrorResponse";
import { authServices } from "@/shared/lib/services/auth.services";
import { toast } from "sonner";

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (value: any) => void;
}> = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = tokenServices.getAccessToken();

    if (token && tokenServices.shouldRefreshToken()) {
      try {
        const newTokens = await authServices.refreshTokens();
        if (newTokens && config.headers) {
          config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        }
      } catch (error) {
        console.error('Failed to refresh token in interceptor:', error);
      }
    } else if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newTokens = await authServices.refreshTokens();

        if (newTokens) {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }

          processQueue(null, newTokens.accessToken);

          return apiClient(originalRequest);
        } else {
          throw new Error('Failed to refresh tokens');
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        authServices.clearAll();

        toast.error('Сессия истекла', {
          description: 'Пожалуйста войдите снова',
          duration: 5000
        });

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const errorMessage = error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    const status = error.response?.status;

    const skipToastForStatuses = [401, 403];
    const shouldShowToast = !skipToastForStatuses.includes(status || 0);

    if (shouldShowToast && typeof window !== 'undefined') {
      if (status && status >= 500) {
        toast.error('Ошибка сервера', {
          description: errorMessage,
          duration: 5000,
        });
      } else if (status && status >= 400) {
        toast.error('Ошибка запроса', {
          description: errorMessage,
          duration: 5000,
        });
      } else {
        toast.error('Произошла ошибка', {
          description: errorMessage,
          duration: 5000,
        });
      }
    }

    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      url: originalRequest?.url,
    });

    return Promise.reject(error);
  }
);

