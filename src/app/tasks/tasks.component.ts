import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../Models/ui-models/task.model';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'isCompleted', 'edit'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  credentials = { username: 'amira', password: 'amira123' };
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Fetch Tasks
    this.taskService.getTasks(this.credentials)
      .subscribe(
        (successResponse:  Task[]) => {
          this.tasks = successResponse;
          console.log("here" +successResponse)
          this.dataSource = new MatTableDataSource<Task>(this.tasks);

          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }

          if (this.matSort) {
            this.dataSource.sort = this.matSort;
          }
        },
        (errorResponse: any) => {
          console.log(errorResponse);
        }
      );
  }

  filterTasks() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
