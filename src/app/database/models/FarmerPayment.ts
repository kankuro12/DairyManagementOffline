/* eslint-disable @typescript-eslint/naming-convention */
import { SqlliteService as db } from 'src/app/services/sqllite.service';
import { Modal } from './model';

export class FarmerPayment extends Modal {
  id: number;
  date: number;
  title?: string;
  amount?: number;
  user_id: number;
  type = 1;

  table="farmerpayments";
  columns=['id','date','title','type','amount','user_id'];

  constructor(columns={}){
    super();
    this.init(columns);
  }


  new(){
    console.log(this);
  }


}
