import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/Models/ui-models/task.model';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  taskId: string | null | undefined;
  task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
    userId: '',
  };

  isNewTask = false;
  header = '';
  displayProfileImageUrl = '';



  @ViewChild('taskDetailsForm') taskDetailsForm?: NgForm;

  constructor(
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTask();
  }
  getTask() {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
      if (this.taskId) {
        if (this.taskId.toLowerCase() === 'Add'.toLowerCase()) {
          // -> new task Functionality
          this.isNewTask = true;
          this.header = 'Add New Task';
        } else {
          // -> Existing task Functionality
          this.isNewTask = false;
          this.header = 'Edit Task';
          this.taskService.getTask(this.taskId).subscribe(
            (successResponse) => {
              this.task = successResponse;

            },
            (errorResponse) => {
            }
          );
        }
      }
    });
  }


  onUpdate(): void {
    if (this.taskDetailsForm?.form.valid) {
      this.taskService
        .updateTask(this.task.id, this.task)
        .subscribe(
          (successResponse) => {
            // Show a notification
            this.snackbar.open('Task updated successfully', undefined, {
              duration: 2000,
            });
          },
          (errorResponse) => {
            // Log it
            console.log(errorResponse);
          }
        );
    }
  }

  onDelete(): void {
    this.taskService.deleteTask(this.task.id).subscribe(
      (successResponse) => {
        this.snackbar.open('Task deleted successfully', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl('tasks');
        }, 2000);
      },
      (errorResponse) => {
        // Log
      }
    );
  }

  onAdd(): void {
    if (this.taskDetailsForm?.form.valid) {
      // Submit form date to api
      this.taskService.addTask(this.task).subscribe(
        (successResponse) => {
          this.snackbar.open('Task added successfully', undefined, {
            duration: 2000,
          });

          setTimeout(() => {
            this.router.navigateByUrl(`tasks/${successResponse.id}`);
          }, 2000);
        },
        (errorResponse) => {
          // Log
          console.log(errorResponse);
        }
      );
    }
  }




}
