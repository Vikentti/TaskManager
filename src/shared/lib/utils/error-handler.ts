import { AxiosError } from 'axios';
import { ErrorResponse } from '@/shared/types/ErrorResponse';

export function isApiError(error: unknown): error is AxiosError<ErrorResponse> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as AxiosError).response?.data === 'object'
  );
}


export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const data = error.response?.data;
    if (data?.message) {
      if (Array.isArray(data.message)) {
        return data.message.join(', ');
      }
      return data.message;
    }
    return error.message || 'An unexpected error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}


export function getErrorStatus(error: unknown): number | undefined {
  if (isApiError(error)) {
    return error.response?.status;
  }
  return undefined;
}


export function isErrorStatus(
  error: unknown,
  status: number
): boolean {
  return getErrorStatus(error) === status;
}

