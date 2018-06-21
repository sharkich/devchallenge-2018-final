import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TEST_MODULE} from '../../../test.module';
import {LoadingComponent} from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(TEST_MODULE));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    component.promise = Promise.resolve();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
