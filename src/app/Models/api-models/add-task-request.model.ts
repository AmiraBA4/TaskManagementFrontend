export interface AddTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  userId: string;
}
