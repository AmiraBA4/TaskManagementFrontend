export interface UpdateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  userId: string;
}
