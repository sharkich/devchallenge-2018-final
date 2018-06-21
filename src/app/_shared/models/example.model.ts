declare var require: any;
const uuid = require('uuid/v1');

export interface IExampleModel {
  id?: string;
  name?: string;
}

export class ExampleModel {

  public id: string;
  public name: string;

  constructor(data: IExampleModel = {}) {
    this.id = data.id || uuid();
    this.name = data.name || '';
  }

}
