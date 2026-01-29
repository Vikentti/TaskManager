import { apiClient } from '@/shared/api/client';
import { apiEndpoints } from '@/shared/config/api.config';
import { Task, TaskDto } from '@/entities/task';

export class TasksApiService {

  async getAll(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(apiEndpoints.tasks.list());
    return response.data;
  }


  async create(data: TaskDto): Promise<Task> {
    const response = await apiClient.post<Task>(
      apiEndpoints.tasks.create(),
      data
    );
    return response.data;
  }


  async update(id: string, data: Partial<TaskDto>): Promise<Task> {
    const response = await apiClient.put<Task>(
      apiEndpoints.tasks.update(id),
      data
    );
    return response.data;
  }


  async delete(id: string): Promise<Task> {
    const response = await apiClient.delete<Task>(
      apiEndpoints.tasks.delete(id)
    );
    return response.data;
  }
}

export const tasksApiService = new TasksApiService();

