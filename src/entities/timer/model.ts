export interface TimerSessionDto {
  isCompleted: boolean;
}

export interface TimerRoundDto {
  totalSeconds: number;
  isCompleted: boolean;
}

export interface PomodoroRound {
  id: string;
  totalSeconds: number;
  isCompleted: boolean;
  createdAt: string;
}

export interface PomodoroSession {
  id: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
  rounds: PomodoroRound[];
}

