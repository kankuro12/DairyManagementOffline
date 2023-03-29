/* eslint-disable @typescript-eslint/naming-convention */
import { SqlliteService as db } from 'src/app/services/sqllite.service';
import { Modal } from './model';

export class MilkAmount extends Modal {
  id: number;
  session: number;
  snf: number;
  fat: number;
  rate: number;
  amount: number;
  user_id: number;
  center_id: number;
  date: number;
  sync = 0;

  table="milkamounts";
  columns=['id','session','snf','fat','rate','amount','user_id','center_id','date','sync'];

  constructor(columns={}){
    super();
    this.init(columns);
  }


  new(){
    console.log(this);
  }


}
