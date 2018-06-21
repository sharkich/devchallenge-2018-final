import {Injectable} from '@angular/core';

import {DbService} from './db.service';
import {APP_CONFIG} from '../../app.config';
import {ExampleModel, IExampleModel} from '../models/example.model';

@Injectable()
export class ExamplesService {

  constructor(private db: DbService) {
  }

  /**
   * Get all EXAMPLES from DB
   * @return {Promise<ExampleModel[]>}
   */
  public list(): Promise<ExampleModel[]> {
    return this.db.list(APP_CONFIG.db.tables.examples)
      .then((objs: ExampleModel[]) => objs.map((obj) => new ExampleModel(obj)))
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

  /**
   * Get EXAMPLE by ID from DB
   * @param {string} id
   * @return {Promise<ExampleModel>}
   */
  public getById(id: string): Promise<ExampleModel> {
    return this.db.getById(APP_CONFIG.db.tables.examples, id)
      .then((obj) => obj && new ExampleModel(<IExampleModel>obj))
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  /**
   * Update/Add EXAMPLE to DB
   * @param {ExampleModel} example
   * @return {Promise<ExampleModel>}
   */
  public save(example: ExampleModel): Promise<ExampleModel> {
    return this.db.update(APP_CONFIG.db.tables.examples, example)
      .then((obj) => new ExampleModel(obj))
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

  /**
   * Delete EXAMPLE from DB
   * @param {ExampleModel} example
   * @return {Promise<any>}
   */
  public delete(example: ExampleModel): Promise<any> {
    return this.db.delete(APP_CONFIG.db.tables.examples, example.id)
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

}
