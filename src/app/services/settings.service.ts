import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //1=fixed [eg gai,vaishi] 2=calculate from snf fat
  rateType=1;
  tabs=[
    {
      title:'Home',
      tab:'tab1',
      icon:'triangle',
      open: true,

    },
    {
      title:'Milk',
      tab:'tab2',
      icon:'triangle',
      open: true,

    },
    {
      title:'Advance',
      tab:'advance',
      icon:'triangle',
      open: true,

    },
    {
      title:'Payment',
      tab:'payment',
      icon:'triangle',
      open: false,

    },
    ,
    {
      title:'Report',
      tab:'report',
      icon:'triangle',
      open: false,

    },

  ];
  open=[true,true,true,false,false];
  constructor() {
    const rateTypeSTR=localStorage.getItem('rate_type');
    if(rateTypeSTR!=null){
        this.rateType=parseInt(rateTypeSTR,10);
    }else{
      localStorage.setItem('rate_type',this.rateType.toString());
    }
   }


   setRateType(type){
    this.rateType=type;
    localStorage.setItem('rate_type',this.rateType.toString());

   }
}
