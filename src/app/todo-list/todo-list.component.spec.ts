import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {TodoListComponent} from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
      ],
      declarations: [
        TodoListComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
