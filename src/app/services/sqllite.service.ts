/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, Query, Type } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { promise } from 'protractor';
import migrations from '../database/migrations';
import { Farmer } from '../database/models/farmer.modal';
import { Modal } from '../database/models/model';

@Injectable({
  providedIn: 'root'
})
export class SqlliteService {
  static current: SqlliteService;

  db: SQLiteObject;
  databaseName = 'data.db';
  currentMigration = 0;

  constructor(private sqlite: SQLite) {
    const migrationSTR = window.localStorage.getItem('_curmig');
    if (migrationSTR) {
      this.currentMigration = parseInt(migrationSTR, 10);
    } else {
      window.localStorage.setItem('_curmig', this.currentMigration.toString());
    }
    this.initDataBase();
    SqlliteService.current = this;
  }


  async initDataBase() {
    this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
    for (let index = this.currentMigration; index < migrations.length; index++) {
      const sql = migrations[index];
      await this.run(sql);
      this.currentMigration += 1;
      window.localStorage.setItem('_curmig', this.currentMigration.toString());
    }
  }

  run(sql: string, params?: any[]) {
    console.log('Running \n ', sql);
    return this.db.executeSql(sql, params);
  }

  do<T>(): T[] {
    const p: T[] = [];
    return p;
  }


  select<T extends Modal>(type: (new (data: any) => T), sql: string, params?: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {

      this.run(sql, params)
        .then((result) => {
          console.log(result);

          const datas: T[] = [];
          for (let index = 0; index < result.rows.length; index++) {
            try {
              const localData = new type(result.rows.item(index));
              datas.push(localData);
            } catch (error) {
              console.error(error);
            }
          }
          resolve(datas);
        })
        .catch((err) => {
          console.error(err);

          reject(err);
        });
    });

  }
}
