export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskDto {
  name: string;
  isCompleted: boolean;
  createdAt?: string;
  priority: TaskPriority;
}

export interface Task {
  id: string;
  name: string;
  priority: TaskPriority;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

