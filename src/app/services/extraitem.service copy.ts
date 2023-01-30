import { ExtraItem } from './../database/structure/extraItem';
import { ApiService } from './api.service';
import { Area, AreaData } from '../database/structure/area.data';
import { Injectable, Type } from '@angular/core';
import { rates } from '../database/structure/rates';

@Injectable({
  providedIn: 'root'
})
export class CustomerRouteService {
  data= [];
  constructor(private api: ApiService) {
    const dataStr=localStorage.getItem('customerroute.data');
    if(dataStr!=null){
      this.data=JSON.parse(dataStr);
    }else{
      this.data=[];
    }
  }

  // pull(){
  //   this.api.get('customer-routes')
  //   .subscribe((data: any[])=>{
  //     this.data=data;
  //     localStorage.setItem('customerroute.data',JSON.stringify(this.data));
  //   });
  // }


}
