import {EventEmitter, Injectable} from '@angular/core';

declare var require: any;
const uuid = require('uuid/v1');

import {APP_CONFIG} from '../../app.config';
import {UserModel} from '../models/user.model';

const TOKEN = APP_CONFIG.localStorage.token;

/**
 * Service for Authenticate
 */
@Injectable()
export class AuthService {

  public user: UserModel;

  public $changeAuthorization: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    const token = window.localStorage.getItem(TOKEN) || null;
    this.user = new UserModel({token});
  }

  /**
   * Login user
   * @return {Promise<any>}
   */
  public signin(): Promise<any> {
    this.user.token = uuid();
    window.localStorage.setItem(TOKEN, this.user.token);
    this.$changeAuthorization.emit(this.user.isAuthorised);
    return Promise.resolve();
  }

  /**
   * Logoff user
   * @return {Promise<any>}
   */
  public signout(): Promise<any> {
    this.user.token = null;
    window.localStorage.removeItem(TOKEN);
    this.$changeAuthorization.emit(this.user.isAuthorised);
    return Promise.resolve();
  }
}
