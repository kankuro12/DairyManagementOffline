import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //1=fixed [eg gai,vaishi] 2=calculate from snf fat
  rateType=1;
  constructor() {
    const rateTypeSTR=localStorage.getItem('rate_type');
    if(rateTypeSTR!=null){
        this.rateType=parseInt(rateTypeSTR,10);
    }else{
      localStorage.setItem('rate_type',this.rateType.toString());
    }
   }

}
