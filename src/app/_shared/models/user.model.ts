declare var require: any;
const uuid = require('uuid/v1');

export interface IUserModel {
  id?: string;
  name?: string;
  token?: string;
}

export class UserModel {
  public id: string;
  public name: string;

  public token: string;

  constructor(data: IUserModel = {}) {
    this.id = data.id || uuid();
    this.name = data.name || '';
    this.token = data.token || null;
  }

  public get isAuthorised(): boolean {
    return !!this.token;
  }

}
