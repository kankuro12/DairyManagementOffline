/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class Bill extends Modal{
  id: number;
  particular: string;
  phone: string;
  name: number;
  total: number;
  discount: number;
  paid: number;
  date: number;
  sync: number;

  table="bills";
  columns=['id','particular','phone','name','total','discount','paid','date','sync'];
  constructor(columns: any){
    super();
    this.init(columns);
  }




}
