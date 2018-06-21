import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TEST_MODULE} from '../../../test.module';
import {DialogLoginComponent} from './dialog-login.component';

describe('DialogLoginComponent', () => {
  let component: DialogLoginComponent;
  let fixture: ComponentFixture<DialogLoginComponent>;

  beforeEach(async(TEST_MODULE));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
