import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../_shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  /**
   * Login form
   * @type {FormGroup}
   */
  public loginForm = new FormGroup({
    loginFormControl: new FormControl('', [
      Validators.required
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Close dialog
   */
  public onCancel() {
    this.router.navigate([this.returnUrl]);
  }

  /**
   * Handle login event
   */
  public onSignIn() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signin()
      .then(this.onCancel.bind(this));
  }

}
