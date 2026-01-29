export interface TimeBlockDto {
  name: string
  color: string | null
  duration: number
  order: number
}

export interface TimeBlock extends TimeBlockDto {
  id: string
  userId: string
  createdAt: string
}

export interface UpdateOrderDto {
  ids: string[]
}

