export interface StatisticItem {
  label: string;
  value: number;
}

export interface UserPublic {
  id: string;
  email: string;
  name: string | null;
  workInterval: number;
  breakInterval: number;
  intervalsCount: number;
  createdAt: string;
}

export interface UserProfileResponse {
  user: UserPublic;
  statistics: StatisticItem[];
}

export interface UserSettingsDto {
  workInterval?: number;
  breakInterval?: number;
  intervalsCount?: number;
}

export interface UserDto extends UserSettingsDto {
  email?: string;
  name?: string;
  password?: string;
}

export interface AuthDto {
  email: string
  password: string
}

export interface AuthToken {
  accessToken: string
}

export interface AuthResponse {
  user: UserPublic
  accessToken: string
  refreshToken: string
}

