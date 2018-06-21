import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TEST_MODULE} from '../test.module';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {

  beforeEach(async(TEST_MODULE));

  it('should create', () => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    const component: LoginComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have `Login` input', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[placeholder=Login]')).toBeTruthy();
  }));

  it('should have `Password` input', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[placeholder=Password]')).toBeTruthy();
  }));

  it('should have `Log In` button', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button[type=submit]').textContent).toContain('Log In');
  }));

  it('should have `Cancel` button', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button[type=button]').textContent).toContain('Cancel');
  }));

  it('should init `loginForm`', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    const component: LoginComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(component.loginForm).toBeDefined();
  }));

  it('should `loginForm` contains loginFormControl', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    const component: LoginComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(component.loginForm.controls.loginFormControl).toBeDefined();
  }));

  it('should `loginForm` contains loginFormControl', async(() => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    const component: LoginComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(component.loginForm.controls.passwordFormControl).toBeDefined();
  }));

});
