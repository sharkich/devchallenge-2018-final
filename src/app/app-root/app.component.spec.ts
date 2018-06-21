import {TestBed, async} from '@angular/core/testing';

import {TEST_MODULE} from '../test.module';
import {AppComponent} from './app.component';
import {AuthService} from '../_shared/services/auth.service';
import {MatDialog} from '@angular/material';
import {DialogLoginComponent} from '../_shared/components/dialog-login/dialog-login.component';
import {Router} from '@angular/router';

describe('AppComponent', () => {

  beforeEach(async(TEST_MODULE));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it(`should init isAuthorised with true`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.debugElement.componentInstance;
    const authService: AuthService = TestBed.get(AuthService);
    authService.user.token = 'token';
    fixture.detectChanges();
    expect(component.isAuthorised).toEqual(true);
  }));

  it(`should init isAuthorised with false`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.debugElement.componentInstance;
    const authService: AuthService = TestBed.get(AuthService);
    authService.user.token = null;
    fixture.detectChanges();
    expect(component.isAuthorised).toEqual(false);
  }));

  it('should have `Home` link', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.docs-navbar-header a')[0].textContent).toContain('Home');
  }));

  it('should have `Examples` link', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.docs-navbar-header a')[1].textContent).toContain('Examples');
  }));

  it('should have `Users` link', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.docs-navbar-header a')[2].textContent).toContain('Users');
  }));

  it('should have `Login` link', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.login a').textContent).toContain('Login');
  }));

  it('should have `Login` button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.login button').textContent).toContain('Sign in');
  }));

  it('should have `Logoff` button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const authService: AuthService = TestBed.get(AuthService);
    authService.user.token = 'token';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.login button').textContent).toContain('Sign out');
  }));

  it('should launch dialog on login', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.debugElement.componentInstance;
    const dialog: MatDialog = TestBed.get(MatDialog);
    spyOn(dialog, 'open');
    component.login();
    expect(dialog.open).toHaveBeenCalledWith(DialogLoginComponent, {width: '450px'});
  }));

  it('should signout user on logoff', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.debugElement.componentInstance;
    const authService: AuthService = TestBed.get(AuthService);
    spyOn(authService, 'signout');
    component.logoff();
    expect(authService.signout).toHaveBeenCalledWith();
  }));

  it('should redirect to home on logoff', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.debugElement.componentInstance;
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.logoff();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

});
