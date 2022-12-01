import { ApiService } from './api.service';
import { CustomerBalance } from './../database/structure/customer.balance.data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  data: CustomerBalance[] =[ ];
  constructor(private api: ApiService,){
    const dataStr=localStorage.getItem('customer.balance');
    if(dataStr!=null){
      this.data=JSON.parse(dataStr);
      //
    }
  }

  pull(){
    this.api.get('balance')
    .subscribe((data: CustomerBalance[])=>{
      this.data=data;
      localStorage.setItem('customer.balance',JSON.stringify(this.data));
    });
  }
}
