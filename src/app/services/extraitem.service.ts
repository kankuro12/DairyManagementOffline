import { ExtraItem } from './../database/structure/extraItem';
import { ApiService } from './api.service';
import { Area, AreaData } from '../database/structure/area.data';
import { Injectable, Type } from '@angular/core';
import { rates } from '../database/structure/rates';

@Injectable({
  providedIn: 'root'
})
export class ExtraItemService {
  data: ExtraItem[];
  constructor(private api: ApiService) {
    const dataStr=localStorage.getItem('extraitems.data');
    if(dataStr!=null){
      this.data=JSON.parse(dataStr);
    }else{
      this.data=[];
    }
  }




}
