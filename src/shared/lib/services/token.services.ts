import { parseJwt } from "@/shared/lib/utils/jwt";

export class TokenServices {
  private ACCESS_TOKEN_KEY = 'accessToken';

  getAccessToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  removeAccessToken(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  clearAll(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    try {
      const payload = parseJwt(token);
      const expire = payload.exp;
      if (!expire) {
        return false;
      }
      return Date.now() >= expire * 1000;
    } catch {
      return true;
    }
  }

  shouldRefreshToken(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return false;
    }

    try {
      const payload = parseJwt(token);
      const expire = payload.exp;
      if (!expire) {
        return false;
      }
      const expiresIn = (expire * 1000) - Date.now();
      return expiresIn < 5 * 60 * 1000;
    } catch {
      return false;
    }
  }
}

export const tokenServices = new TokenServices();

