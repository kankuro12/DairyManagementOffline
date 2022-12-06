/* eslint-disable @typescript-eslint/naming-convention */
import { SqlliteService as db } from 'src/app/services/sqllite.service';
import { Modal } from './model';

export class SnfFat extends Modal {
  id: number;
  date: number;
  snf: number;
  fat: number;
  session: number;
  user_id: number;


  table="snffats";
  columns=['id','date','snf','fat','session','user_id'];

  constructor(columns={}){
    super();
    this.init(columns);
  }


  new(){
    console.log(this);
  }


}
