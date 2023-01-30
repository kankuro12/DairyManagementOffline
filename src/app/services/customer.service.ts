import { AreaData } from './../database/structure/area.data';
import { ExtraItem } from './../database/structure/extraItem';
import { rates } from './../database/structure/rates';
import { ExtraItemService } from './extraitem.service';
import { RatesService } from './rates.services';
import { AreaDataService } from './area.data.services';
import { ApiService } from './api.service';
import { CustomerBalance } from './../database/structure/customer.balance.data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  data: CustomerBalance[] =[ ];
  routeCustomers: string[]=[];

  constructor(private api: ApiService,private areaDataService: AreaDataService,
    private rateService: RatesService,
    private extraItemService: ExtraItemService){
    const dataStr=localStorage.getItem('customer.balance');
    if(dataStr!=null){
      this.data=JSON.parse(dataStr);
      //
    }

    const dataStr1=localStorage.getItem('customer.route');
    if(dataStr1!=null){
      this.routeCustomers=JSON.parse(dataStr1);
      //
    }
  }


  pull(){
    this.api.get('customer-data')
    .subscribe((alldata: any)=>{
      console.log(alldata);
      this.data=alldata.customer_balance;
      localStorage.setItem('customer.balance',JSON.stringify(this.data));

      this.routeCustomers=alldata.customer_route;
      localStorage.setItem('customer.route',JSON.stringify(this.routeCustomers));

      this.areaDataService. data=alldata.areas;
      localStorage.setItem('area.data',JSON.stringify(this.areaDataService.data));

      this.rateService.data=alldata.rates;
      localStorage.setItem('rates.data',JSON.stringify(this.rateService.data));

      this.extraItemService.data=alldata.extra_items;
      localStorage.setItem('extraitems.data',JSON.stringify(this.extraItemService.data));
      // this.pullRoute();
    });
  }

  pullold(){
    this.api.get('balance')
    .subscribe((data: CustomerBalance[])=>{
      this.data=data;
      localStorage.setItem('customer.balance',JSON.stringify(this.data));
      this.pullRoute();
    });
  }

  pullRoute(){
    this.api.get('customer-routes')
    .subscribe((data: string[])=>{
      this.routeCustomers=data;
      localStorage.setItem('customer.route',JSON.stringify(this.routeCustomers));
      this.pullRates();
    });
  }

  pullRates(){
      this.api.get('rates')
      .subscribe((data: rates[])=>{
        this.rateService.data=data;
        localStorage.setItem('rates.data',JSON.stringify(this.rateService.data));
        this.pullExtraItems();
      });

  }

  pullExtraItems(){
    this.api.get('extra-items')
    .subscribe((data: ExtraItem[])=>{
      this.extraItemService.data=data;
      localStorage.setItem('extraitems.data',JSON.stringify(this.extraItemService.data));
      this.pullAreaData();
    });
  }

  pullAreaData(){
      this.api.get('areas')
      .subscribe((data: AreaData)=>{
        this.areaDataService. data=data;
        localStorage.setItem('area.data',JSON.stringify(this.areaDataService.data));
      });
    }




}
