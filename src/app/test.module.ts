import {TestBed} from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatDialogRef,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {APP_ROUTES} from './app.routing';
import {AppComponent} from './app.component';
import {AuthGuard} from './_shared/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DbService} from './_shared/services/db.service';
import {AuthService} from './_shared/services/auth.service';
import {UsersService} from './_shared/services/users.service';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {ExamplesService} from './_shared/services/examples.service';
import {DialogLoginComponent} from './_shared/components/dialog-login/dialog-login.component';
import {LoadingComponent} from './_shared/components/loading/loading.component';

export const TEST_MODULE = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(APP_ROUTES),

      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      NoopAnimationsModule,

      MatListModule,
      MatCardModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatToolbarModule,
      MatProgressSpinnerModule,
    ],
    declarations: [
      AppComponent,
      DialogLoginComponent,
      HomeComponent,
      TodoListComponent,
      TodoItemComponent,
      LoginComponent,
      LoadingComponent
    ],
    providers: [
      AuthGuard,
      AuthService,

      DbService,
      ExamplesService,
      UsersService,

      {provide: MatDialogRef, useValue: {}},
    ]
  }).compileComponents();
};
