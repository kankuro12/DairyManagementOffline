/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class CustomerPayment extends Modal{
  id: number;
  amount: number;
  date: number;
  phone: string;
  name: number;
  sync: number;

  table="customerpayments";
  columns=['id','phone','name','amount','date','sync'];
  constructor(columns: any){
    super();
    this.init(columns);
  }




}
