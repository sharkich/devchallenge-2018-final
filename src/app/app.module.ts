import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogLoginComponent} from './_shared/components/dialog-login/dialog-login.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {environment} from '../environments/environment';

import {ROUTING} from './app.routing';

import {AuthGuard} from './_shared/auth.guard';
import {AuthService} from './_shared/services/auth.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogLoginComponent,
    HomeComponent,
    TodoListComponent,
    TodoItemComponent,
    LoginComponent
  ],
  imports: [
    ROUTING,

    HttpModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,

    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  entryComponents: [
    DialogLoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
