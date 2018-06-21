import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {AngularIndexedDB} from 'angular2-indexeddb';

import {APP_CONFIG} from '../../app.config';
import {UserModel} from '../models/user.model';
import {ExampleModel} from '../models/example.model';

/**
 * Service for IndexedDB
 */
@Injectable()
export class DbService {

  private db = new AngularIndexedDB(APP_CONFIG.db.name, APP_CONFIG.db.version);
  private dbReadyPromise: Promise<any>;
  private isTablesJustCreated = false;

  constructor(private http: Http) {
    this.dbReadyPromise = this.db.openDatabase(APP_CONFIG.db.version, this.createTables.bind(this))
      .then(() => {
        if (!this.isTablesJustCreated) {
          return;
        }
        this.isTablesJustCreated = false;
        return Promise.all([
          this.fillUsers(),
          this.fillExamples(),
        ]);
      })
      .catch((error) => {
        console.error('db.error', error);
        return Promise.reject(error);
      });
  }

  /**
   * Get list of assets
   * @param {string} table
   * @return {Promise<any[]>}
   */
  public list(table: string): Promise<any[]> {
    return this.dbReadyPromise
      .then(() => this.db.getAll(table))
      .then((objs: any[]) => {
        return objs;
      }, (error) => {
        return Promise.reject(error);
      });
  }

  /**
   * Get asset by ID
   * @param {string} table
   * @param {string} id
   * @return {Promise<any[]>}
   */
  public getById(table: string, id: string): Promise<any[]> {
    return this.dbReadyPromise
      .then(() => this.db.getByKey(table, id))
      .then((obj: any) => {
        if (!obj) {
          return Promise.reject(new Error('404 Not Found'));
        }
        return obj;
      }, (error) => {
        return Promise.reject(error);
      });
  }

  /**
   * Update/add asset to table
   * @param {string} table
   * @param model
   * @return {Promise<any>}
   */
  public update(table: string, model: any): Promise<any> {
    return this.db.update(table, model)
      .then((data) => {
        return Promise.resolve(data);
      }, (error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  /**
   * Add asset to table
   * @param {string} table
   * @param data
   * @return {Promise<any>}
   */
  public add(table: string, data: any): Promise<any> {
    return this.db.add(table, data)
      .then((res) => {
        return Promise.resolve(res);
      }, (error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  /**
   * Delete asset from table
   * @param {string} table
   * @param {string | number} id
   * @return {Promise<any>}
   */
  public delete(table: string, id: string|number): Promise<any> {
    return this.db.delete(table, id)
      .then((data) => {
        return Promise.resolve(data);
      }, (error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  /**
   * Clear table
   * @param {string} table
   * @return {Promise<any>}
   */
  public clear(table: string): Promise<any> {
    return this.db.clear(table);
  }

  /**
   * Init tables
   * @param evt
   */
  private createTables(evt: any) {

    const librariesStore: IDBObjectStore = evt.currentTarget.result
      .createObjectStore(APP_CONFIG.db.tables.users, {keyPath: 'id'});
    librariesStore.createIndex('name', 'name', {unique: false});

    const booksStore: IDBObjectStore = evt.currentTarget.result
      .createObjectStore(APP_CONFIG.db.tables.examples, {keyPath: 'id'});
    booksStore.createIndex('name', 'name', {unique: false});

    this.isTablesJustCreated = true;
  }

  /**
   * Initial fill users
   * @return {Promise<UserModel[]>}
   */
  private fillUsers() {
    return this.http.get(APP_CONFIG.url.users)
      .toPromise()
      .then((res: any) => {
        const arr: any[] = res.json();
        const books: UserModel[] = arr.map((obj) => new UserModel(obj));
        const promises = [];
        books.forEach((el: UserModel) => {
          promises.push(this.db.add(APP_CONFIG.db.tables.users, el));
        });
        return promises;
      });
  }

  /**
   * Initial fill EXAMPLES
   * @return {Promise<ExampleModel[]>}
   */
  private fillExamples() {
    return this.http.get(APP_CONFIG.url.examples)
      .toPromise()
      .then((res: any) => {
        const arr: any[] = res.json();
        const libraries: ExampleModel[] = arr.map((obj) => new ExampleModel(obj));
        const promises = [];
        libraries.forEach((el: ExampleModel) => {
          promises.push(this.db.add(APP_CONFIG.db.tables.examples, el));
        });
        return promises;
      });
  }

}
