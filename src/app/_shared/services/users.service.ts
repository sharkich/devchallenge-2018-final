import {Injectable} from '@angular/core';

import {DbService} from './db.service';
import {APP_CONFIG} from '../../app.config';
import {UserModel, IUserModel} from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(private db: DbService) {
  }

  /**
   * Get all users from DB
   * @return {Promise<UserModel[]>}
   */
  public list(): Promise<UserModel[]> {
    return this.db.list(APP_CONFIG.db.tables.users)
      .then((objs: UserModel[]) => objs.map((obj) => new UserModel(obj)))
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

  /**
   * Get user by ID from DB
   * @param {string} id
   * @return {Promise<UserModel>}
   */
  public getById(id: string): Promise<UserModel> {
    return this.db.getById(APP_CONFIG.db.tables.users, id)
      .then((obj) => obj && new UserModel(<IUserModel>obj))
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  /**
   * Update/Add user to DB
   * @param {UserModel} user
   * @return {Promise<UserModel>}
   */
  public save(user: UserModel): Promise<UserModel> {
    return this.db.update(APP_CONFIG.db.tables.users, user)
      .then((obj) => new UserModel(obj))
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

  /**
   * Delete user from DB
   * @param {UserModel} user
   * @return {Promise<any>}
   */
  public delete(user: UserModel): Promise<any> {
    return this.db.delete(APP_CONFIG.db.tables.users, user.id)
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

}
