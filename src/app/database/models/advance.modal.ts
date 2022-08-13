/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class Advance extends Modal{
  id: number;
  date?: number;
  title?: string;
  amount?: number;
  user_id: number;
  table="advances";
  columns=['id','date','amount','title','user_id'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
