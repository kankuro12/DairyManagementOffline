/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class ChalanItem extends Modal{
  id: number;
  title: string;
  date: number;
  rate: number;
  item_id: number;
  user_id: number;
  table="chalanitems";
  columns=['id','title','item_id','rate','date','user_id'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
