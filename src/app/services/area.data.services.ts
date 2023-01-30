import { ApiService } from './api.service';
import { Area, AreaData } from './../database/structure/area.data';
import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaDataService {
  data: AreaData;
  constructor(private api: ApiService) {
    const dataStr=localStorage.getItem('area.data');
    if(dataStr!=null){
      this.data=JSON.parse(dataStr);
    }else{
      this.data={
        areas:[],
        match:[],
        rates:[],
        routes:[]
      };
    }
  }


}
