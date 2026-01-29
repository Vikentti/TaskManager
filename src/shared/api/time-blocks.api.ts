import { apiClient } from './client';
import { apiEndpoints } from '@/shared/config/api.config';
import { TimeBlock, TimeBlockDto, UpdateOrderDto } from '@/entities/time-block';

export class TimeBlocksApiService {

  async getAll(): Promise<TimeBlock[]> {
    const response = await apiClient.get<TimeBlock[]>(
      apiEndpoints.timeBlocks.list()
    );
    return response.data;
  }


  async create(data: TimeBlockDto): Promise<TimeBlock> {
    const response = await apiClient.post<TimeBlock>(
      apiEndpoints.timeBlocks.create(),
      data
    );
    return response.data;
  }


  async update(id: string, data: Partial<TimeBlockDto>): Promise<TimeBlock> {
    const response = await apiClient.put<TimeBlock>(
      apiEndpoints.timeBlocks.update(id),
      data
    );
    return response.data;
  }


  async delete(id: string): Promise<TimeBlock> {
    const response = await apiClient.delete<TimeBlock>(
      apiEndpoints.timeBlocks.delete(id)
    );
    return response.data;
  }


  async updateOrder(data: UpdateOrderDto): Promise<TimeBlock[]> {
    const response = await apiClient.put<TimeBlock[]>(
      apiEndpoints.timeBlocks.updateOrder(),
      data
    );
    return response.data;
  }
}

export const timeBlocksApiService = new TimeBlocksApiService();

