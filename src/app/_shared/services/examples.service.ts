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
   * Get book model by ID from DB
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
   * Update/Add book to DB
   * @param {ExampleModel} book
   * @return {Promise<ExampleModel>}
   */
  public save(book: ExampleModel): Promise<ExampleModel> {
    return this.db.update(APP_CONFIG.db.tables.examples, book)
      .then((obj) => new ExampleModel(obj))
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

  /**
   * Delete book from DB
   * @param {ExampleModel} book
   * @return {Promise<any>}
   */
  public delete(book: ExampleModel): Promise<any> {
    return this.db.delete(APP_CONFIG.db.tables.examples, book.id)
      .catch((error) => {
        console.error('error', error);
        return Promise.reject(error);
      });
  }

}
