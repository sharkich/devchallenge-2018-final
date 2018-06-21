import {async, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {TEST_MODULE} from '../test.module';

describe('HomeComponent', () => {

  beforeEach(async(TEST_MODULE));

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component: HomeComponent = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have `Home` link', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Dev Challenge 12');
  }));

});
