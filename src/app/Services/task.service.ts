import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateTaskRequest } from '../Models/api-models/update-task-request.model';
import { AddTaskRequest } from '../Models/api-models/add-task-request.model';

import { Task } from '../Models/api-models/task.model';
import { AuthInterceptor } from '../interceptor/auth-interceptor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseApiUrl = environment.baseApiUrl;
  private authApiUrl = environment.authApiUrl;

  constructor(private httpClient: HttpClient, private authService : AuthService) { }


//   getTasks(): Observable<Task[]> {
// console.log("heeere")
//     const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
//     return this.httpClient.get<any[]>(this.baseApiUrl + '/user-tasks', { headers });
//     // return this.httpClient.get<Task[]>(this.baseApiUrl + '/user-tasks');
//   }

getTasks(credentials: { username: string, password: string }): any {
  return this.httpClient.post<{ token: string }>(this.authApiUrl, credentials).pipe(
    switchMap(response => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${response.token}`);
      return this.httpClient.get<any[]>(this.baseApiUrl + '/user-tasks', { headers });


    }),
    catchError(error => {
      console.error('Erreur lors de la récupération des tâches', error);
      return throwError(error);
    })
  );
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
function throwError(error: any): any {
  throw new Error('Function not implemented.');
}

