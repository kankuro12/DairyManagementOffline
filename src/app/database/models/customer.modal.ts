/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class Customer extends Modal{
  id: number;
  name: string;
  phone: string;
  table="customers";
  columns=['id','name','phone'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
