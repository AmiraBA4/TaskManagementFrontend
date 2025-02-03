import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateTaskRequest } from '../Models/api-models/update-task-request.model';
import { AddTaskRequest } from '../Models/api-models/add-task-request.model';

import { Task } from '../Models/api-models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }


  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseApiUrl );
  }

  getTask(taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(this.baseApiUrl  + taskId)
  }


  updateTask(taskId: string, taskRequest: Task): Observable<Task> {
    const updateTaskRequest: UpdateTaskRequest = {
      title: taskRequest.title,
      description: taskRequest.description,
      dueDate: taskRequest.dueDate,
      isCompleted: taskRequest.isCompleted,
      userId: taskRequest.userId
    }

    return this.httpClient.put<Task>(this.baseApiUrl + '/tasks/' + taskId,updateTaskRequest );
  }

  deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete<Task>(this.baseApiUrl + '/tasks/' + taskId);
  }

  addTask(taskRequest: Task): Observable<Task> {
    const addTaskRequest: AddTaskRequest = {
      title: taskRequest.title,
      description: taskRequest.description,
      dueDate: taskRequest.dueDate,
      isCompleted: taskRequest.isCompleted,
      userId: taskRequest.userId
    };

    return this.httpClient.post<Task>(this.baseApiUrl, addTaskRequest);
  }

}
