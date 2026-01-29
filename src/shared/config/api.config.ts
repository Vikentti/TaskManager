class ApiEndpoints {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  auth = {
    login: () => `${this.baseUrl}/auth/login`,
    register: () => `${this.baseUrl}/auth/register`,
    refreshToken: () => `${this.baseUrl}/auth/login/access-token`,
    logout: () => `${this.baseUrl}/auth/logout`,
  };

  user = {
    profile: () => `${this.baseUrl}/user/profile`,
  };

  tasks = {
    list: () => `${this.baseUrl}/user/tasks`,
    create: () => `${this.baseUrl}/user/tasks`,
    update: (id: string) => `${this.baseUrl}/user/tasks/${id}`,
    delete: (id: string) => `${this.baseUrl}/user/tasks/${id}`,
  };

  timeBlocks = {
    list: () => `${this.baseUrl}/user/time-blocks`,
    create: () => `${this.baseUrl}/user/time-blocks`,
    update: (id: string) => `${this.baseUrl}/user/time-blocks/${id}`,
    delete: (id: string) => `${this.baseUrl}/user/time-blocks/${id}`,
    updateOrder: () => `${this.baseUrl}/user/time-blocks/update-order`,
  };

  timer = {
    today: () => `${this.baseUrl}/user/timer/today`,
    create: () => `${this.baseUrl}/user/timer`,
    update: (id: string) => `${this.baseUrl}/user/timer/${id}`,
    delete: (id: string) => `${this.baseUrl}/user/timer/${id}`,
    updateRound: (id: string) => `${this.baseUrl}/user/timer/round/${id}`,
  };
}

export const apiEndpoints = new ApiEndpoints();

