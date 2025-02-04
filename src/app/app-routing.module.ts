import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';

const routes: Routes = [
{
  path: '',
  component: TasksComponent
},
{
  path: 'tasks',
  component: TasksComponent
},
{
  path: 'tasks/:id',
  component: ViewTaskComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
