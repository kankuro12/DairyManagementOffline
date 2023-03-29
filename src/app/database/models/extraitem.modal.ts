import { Output } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class ExtraItemModal extends Modal{
  id: number;
  itemin: number;
  itemout: number;
  date: number;
  phone: string;
  name: string;
  sync: number;
  extra_item_id: number;
  user_id: number;

  table="extraitems";
  columns=['id','itemin','itemout','date','phone','name','sync','extra_item_id','user_id'];
  constructor(columns: any){
    super();
    this.init(columns);
  }
}
