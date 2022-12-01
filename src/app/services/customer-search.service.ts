/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { SqlliteService } from 'src/app/services/sqllite.service';
import { Injectable } from '@angular/core';
import { Customer } from '../database/models/customer.modal';
import { ApiService } from './api.service';
import { Helper } from '../utli/helper';

@Injectable({
  providedIn: 'root'
})
export class CustomerSearchService {
  customers: Customer[]=[];
  searchCustomers: Customer[]=[];
  keyword='';
  canSearch=false;
  t:  ReturnType<typeof setTimeout>;

  constructor(private db: SqlliteService,private api: ApiService) {
    this.db.select(Customer,"select * from customers").then((clist)=>{
      this.customers=clist;
      console.log(clist);
      this.searchCustomers=this.customers.slice(0,20);
    });
   }

   apiSearch(){
    if(this.keyword.length>1){

      this.api.post('app/customer-search',{
        keyword:this.keyword,
        limit: 20-this.searchCustomers.length,
        phones: this.searchCustomers.map(o=>o.phone)
      })
      .subscribe(async (customerList: any[])=>{

        this.searchCustomers=this.searchCustomers.concat(customerList);
        for (let index = 0; index < customerList.length; index++) {
          const customer = customerList[index];
          const f = new Customer(customer);
          await f.save();
          this.customers.push(f);
        }

      });
    }
  }

  loadDetail(phone){
    // return Helper.toPromise(this.api.g)
  }

  search(e){
    this.keyword=e.target.value;
    this.searchCustomers=this.customers.filter(o=>o.name.toLowerCase().startsWith(this.keyword.toLowerCase()) || o.phone.startsWith(this.keyword)).slice(0,20);
    this.canSearch=false;
    if(this.t!=null){
      clearTimeout(this.t);
      this.t=null;
    }
    this.t=setTimeout(()=>{
      if(this.searchCustomers.length<20){
        this.apiSearch();
      }
    },1000);
  }
}
