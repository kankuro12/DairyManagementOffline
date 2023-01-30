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

  table="centers";
  columns=['id','itemin','itemout','date','phone','name','sync'];
  constructor(columns: any){
    super();
    this.init(columns);
  }



}
