/* eslint-disable @typescript-eslint/naming-convention */
import { Modal } from './model';
export class MilkData extends Modal{
  id: number;
  date?: number;
  m_amount?: number;
  e_amount?: number;
  user_id: number;
  center_id: number;
  table="milkdatas";
  columns=['id','date','m_amount','e_amount','user_id','center_id'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
