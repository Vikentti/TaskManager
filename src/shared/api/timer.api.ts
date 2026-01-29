import { apiClient } from './client';
import { apiEndpoints } from '@/shared/config/api.config';
import {
  PomodoroSession,
  TimerSessionDto,
  TimerRoundDto,
  PomodoroRound,
} from '@/entities/timer';

export class TimerApiService {

  async getToday(): Promise<PomodoroSession | null> {
    const response = await apiClient.get<PomodoroSession | null>(
      apiEndpoints.timer.today()
    );
    return response.data;
  }


  async create(): Promise<PomodoroSession> {
    const response = await apiClient.post<PomodoroSession>(
      apiEndpoints.timer.create()
    );
    return response.data;
  }


  async updateSession(
    id: string,
    data: TimerSessionDto
  ): Promise<PomodoroSession> {
    const response = await apiClient.put<PomodoroSession>(
      apiEndpoints.timer.update(id),
      data
    );
    return response.data;
  }

  async deleteSession(id: string): Promise<PomodoroSession> {
    const response = await apiClient.delete<PomodoroSession>(
      apiEndpoints.timer.delete(id)
    );
    return response.data;
  }


  async updateRound(id: string, data: TimerRoundDto): Promise<PomodoroRound> {
    const response = await apiClient.put<PomodoroRound>(
      apiEndpoints.timer.updateRound(id),
      data
    );
    return response.data;
  }
}

export const timerApiService = new TimerApiService();

