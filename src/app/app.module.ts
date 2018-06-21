import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogLoginComponent} from './_shared/components/dialog-login/dialog-login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';

import {environment} from '../environments/environment';

import {APP_ROUTING} from './app.routing';

import {AuthGuard} from './_shared/auth.guard';
import {DbService} from './_shared/services/db.service';
import {AuthService} from './_shared/services/auth.service';
import {UsersService} from './_shared/services/users.service';
import {ExamplesService} from './_shared/services/examples.service';

import {AppComponent} from './app-root/app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {LoadingComponent} from './_shared/components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogLoginComponent,
    HomeComponent,
    TodoListComponent,
    TodoItemComponent,
    LoginComponent,
    LoadingComponent
  ],
  imports: [
    APP_ROUTING,

    HttpModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,

    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    AuthGuard,
    AuthService,

    DbService,
    ExamplesService,
    UsersService
  ],
  entryComponents: [
    DialogLoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
