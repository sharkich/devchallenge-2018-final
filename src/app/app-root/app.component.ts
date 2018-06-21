import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from '../_shared/services/auth.service';
import {DialogLoginComponent} from '../_shared/components/dialog-login/dialog-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isAuthorised: boolean;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.isAuthorised = this.authService.user.isAuthorised;
    this.authService.$changeAuthorization
      .subscribe(() => {
        this.isAuthorised = this.authService.user.isAuthorised;
      });
  }

  ngOnDestroy() {
    this.authService.$changeAuthorization.unsubscribe();
  }

  public login() {
    this.dialog.open(DialogLoginComponent, {width: '450px'});
  }

  public logoff() {
    this.authService.signout();
    this.router.navigate(['/']);
  }

}
