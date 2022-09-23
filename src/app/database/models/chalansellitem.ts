/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class ChalanSellItem extends Modal{
  id: number;
  title: string;
  phone: string;
  date: number;
  rate: number;
  qty: number;
  sync: number;
  item_id: number;
  user_id: number;
  table="chalansellitems";
  columns=['id','title','phone','date','rate','item_id','qty','sync','user_id'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
