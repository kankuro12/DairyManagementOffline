/* eslint-disable @typescript-eslint/no-shadow */
import { resolve } from 'dns';
import { SqlliteService } from './../../services/sqllite.service';

export class Modal {
  table;
  primary = 'id';
  columns: string[];
  constructor() { }
  static all() {

  }
  init(columns = {}) {
    for (const key in columns) {
      if (this.columns.includes(key)) {
        this[key] = columns[key];
      }
    }
  }

  propertyList() {
    const list = [];
    this.columns.forEach(column => {
      list.push([column, this[column]]);
    });

  }



  save() {
    return new Promise((resolve, reject)=> {

      const params = [];
      const values = [];
      this.columns.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          const element = this[key];
          // const originalElement = this.original[key];
          if (element !== undefined) {

            params.push(key);
            values.push(element);

          }
        }
      });

      if (params.length > 0) {
        const paramsSTR = "(" + params.join(",") + ")";
        const argSTR = "(" + params.map(o => '?').join(",") + ")";

        const query = `INSERT OR REPLACE INTO ${this.table} ${paramsSTR} VALUES ${argSTR}`;
        console.log(query);

        SqlliteService.current.run(query, values)
          .then((res) => {
            console.log(res);
            if (res.insertId) {
              this[this.primary] = res.insertId;
            }
            console.log("saved",query);
            resolve(this);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });

      }else{

      }
    });
  }

  del() {
    return new Promise((resolve, reject) => {

      const localid = this[this.primary];
      console.log(localid);

      if (localid !== undefined) {
        SqlliteService.current.run(`delete from ${this.table} where ${this.primary}=${localid}`, [])
          .then((res) => {
            console.log(res);
            resolve({status:true});
          })
          .catch((err) => {
            console.log(err);
            resolve({
              status:false,
              err
            });
          });
      }else{
        resolve(true);
      }
    });
  }
}
