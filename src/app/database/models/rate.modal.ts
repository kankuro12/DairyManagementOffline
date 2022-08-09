import { Modal } from './model';
export class Rate extends Modal{
  id: number;
  name?: string;
  rate?: number;
  type = 1;

  table="rates";
  columns=['id','name','rate'];
  constructor(columns: any){
    super();
    this.init(columns);
  }


}
