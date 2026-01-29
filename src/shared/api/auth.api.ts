import { AuthDto, AuthResponse } from "@/entities/user";
import { apiClient } from './client';
import { AuthServices, authServices } from "@/shared/lib/services/auth.services";
import { UserDto, UserProfileResponse, UserPublic } from "@/entities/user";
import { userServices } from "@/shared/lib/services/user.services";
import { apiEndpoints } from "@/shared/config/api.config";

export class ApiAuthService {

  async login(data: AuthDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      apiEndpoints.auth.login(),
      data
    );
    authServices.saveAuthData(response.data);
    return response.data;
  }

  async register(data: AuthDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      apiEndpoints.auth.register(),
      data
    );
    authServices.saveAuthData(response.data);
    return response.data;
  }

  async logout(): Promise<boolean> {
    try {
      await apiClient.post(apiEndpoints.auth.logout());
      authServices.clearAll();
      return true;
    } catch (error) {
      console.error('Logout API error:', error);
      authServices.clearAll();
      return false;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      apiEndpoints.auth.refreshToken()
    );
    authServices.saveAuthData(response.data);
    return response.data;
  }

  async getProfile(): Promise<UserProfileResponse> {
    const response = await apiClient.get<UserProfileResponse>(
      apiEndpoints.user.profile()
    );
    return response.data;
  }

  async updateProfile(data: UserDto): Promise<UserPublic> {
    const response = await apiClient.put<UserPublic>(
      apiEndpoints.user.profile(),
      data
    );
    if (response.data) {
      userServices.updateUserSettings(response.data);
    }
    return response.data;
  }
}

export const apiAuthService = new ApiAuthService();

