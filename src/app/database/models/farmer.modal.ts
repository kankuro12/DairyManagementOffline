/* eslint-disable @typescript-eslint/naming-convention */
import { SqlliteService as db } from 'src/app/services/sqllite.service';
import { Modal } from './model';

export class Farmer extends Modal {
  id: number;
  no: number;
  name?: string;
  center_id?: number;
  type = 1;

  table="farmers";
  columns=['id','no','name','type','center_id'];

  constructor(columns={}){
    super();
    this.init(columns);
  }


  new(){
    console.log(this);
  }


}
