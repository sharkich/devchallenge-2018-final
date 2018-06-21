import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from './_shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isAuthorised: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthorised = this.authService.user.isAuthorised;
    this.authService.$changeAuthorization
      .subscribe((isAuthorised) => {
        this.isAuthorised = this.authService.user.isAuthorised;
      });
  }

  ngOnDestroy() {
    this.authService.$changeAuthorization.unsubscribe();
  }

  public login() {
    console.log('login');
  }

  public logoff() {
    this.authService.signout();
  }

}
