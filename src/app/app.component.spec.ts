import {TestBed, async} from '@angular/core/testing';

import {TEST_MODULE} from './test.module';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

  beforeEach(async(TEST_MODULE));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have isAuthorised`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.isAuthorised).toEqual('app');
  // }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.docs-navbar-header a').textContent).toContain('Home');
  }));

});
