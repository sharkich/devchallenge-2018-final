import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './_shared/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component';

export const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},

  {path: 'examples', component: TodoListComponent, canActivate: [AuthGuard]},
  {path: 'examples/:id', component: TodoItemComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
