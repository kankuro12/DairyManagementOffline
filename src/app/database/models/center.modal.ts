/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class Center extends Modal{
  id: number;
  name: string;
  snf_rate?: number;
  fat_rate?: number;
  cc?: number;
  tc?: number;

  table="centers";
  columns=['id','name','snf_rate','fat_rate','cc','tc'];
  constructor(columns: any){
    super();
    this.init(columns);
  }



}
