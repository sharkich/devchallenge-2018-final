import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule, MatCardModule, MatDialogModule, MatDialogRef, MatInputModule, MatToolbarModule} from '@angular/material';


import {AuthService} from '../../services/auth.service';
import {DialogLoginComponent} from './dialog-login.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DialogLoginComponent', () => {
  let component: DialogLoginComponent;
  let fixture: ComponentFixture<DialogLoginComponent>;

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
        DialogLoginComponent
      ],
      providers: [
        AuthService,
        {provide: MatDialogRef, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
