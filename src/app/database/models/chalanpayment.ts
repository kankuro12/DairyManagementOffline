/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class ChalanPayment extends Modal{
  id: number;
  phone: string;
  date: number;
  amount: number;
  user_id: number;
  sync: number;
  table="chalanpayments";
  columns=['id','phone','date','amount','user_id','sync'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
