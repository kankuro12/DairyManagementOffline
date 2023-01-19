import { ApiService } from './api.service';
import { Area, AreaData } from './../database/structure/area.data';
import { Injectable, Type } from '@angular/core';
import { rates } from '../database/structure/rates';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  data: rates[];
  constructor(private api: ApiService) {
    const dataStr=localStorage.getItem('rates.data');
    if(dataStr!=null){
      this.data=JSON.parse(dataStr);
    }else{
      this.data=[];
    }
  }

  pull(){
    this.api.get('rates')
    .subscribe((data: rates[])=>{
      this.data=data;
      localStorage.setItem('rates.data',JSON.stringify(this.data));
    });
  }
}
