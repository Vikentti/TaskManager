import {UserPublic, UserSettingsDto} from "@/entities/user";

export class UserServices {
  private USER_KEY = 'user';


  getUser(): UserPublic | null {
    if (typeof window === 'undefined') {
      return null
    }

    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  setUser(user: UserPublic): void {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }
  removeUser(): void {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.removeItem(this.USER_KEY)
  }

  updateUserSettings(settings: Partial<UserSettingsDto>) {
    const user = this.getUser();

    if (user) {
      this.setUser({ ...user, ...settings });
    }
  }

  getUserId(): string | null {
    return this.getUser()?.id || null
  }
}

export const userServices = new UserServices()

