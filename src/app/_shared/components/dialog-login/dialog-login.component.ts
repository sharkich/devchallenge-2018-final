import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {

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
    private dialogRef: MatDialogRef<DialogLoginComponent>
  ) {
  }

  /**
   * Close dialog
   */
  public onCancel() {
    this.dialogRef.close();
  }

  /**
   * Handle login event
   */
  public onSignIn() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signin()
      .then(() => this.dialogRef.close());
  }

}
