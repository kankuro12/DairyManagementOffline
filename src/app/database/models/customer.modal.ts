/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class Customer extends Modal{
  id: number;
  area_id: number;
  name: string;
  phone: string;
  table="customers";
  columns=['id','name','phone','area_id'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
