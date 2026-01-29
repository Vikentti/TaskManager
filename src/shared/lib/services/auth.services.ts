import axios from "axios";
import {TokenServices, tokenServices} from "@/shared/lib/services/token.services";
import {UserServices, userServices} from "@/shared/lib/services/user.services";
import {UserPublic} from "@/entities/user";
import {AuthResponse} from "@/entities/user";

export class AuthServices {
  constructor(
    private tokenServices: TokenServices,
    private userServices: UserServices
  ) {}

  saveAuthData(response: AuthResponse): void {
    this.tokenServices.setAccessToken(response.accessToken);
    this.userServices.setUser(response.user);
  }

  isAuthenticated(): boolean {
    return !!this.tokenServices.getAccessToken();
  }

  clearAll(): void {
    this.tokenServices.clearAll();
    this.userServices.removeUser();
  }

  async refreshTokens(): Promise<{
    accessToken: string;
    user: UserPublic;
  } | null> {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/auth/login/access-token`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken, user } = response.data;
      this.tokenServices.setAccessToken(accessToken);
      this.userServices.setUser(user);
      return { accessToken, user };
    } catch (error) {
      console.error('Failed to refresh tokens:', error);
      this.clearAll();
      return null;
    }
  }
}

export const authServices = new AuthServices(tokenServices, userServices);

