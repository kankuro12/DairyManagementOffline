import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //1=fixed [eg gai,vaishi] 2=calculate from snf fat
  rateType=2;

  home=[
    {
      title:'Centers',
      path: '/pages/centers',
      active: true,

    },
    {
      title:'Rates',
      path: '/pages/rates',
      active: false,

    },
    {
      title:'Reports',
      path: '/reports',
      active: false,

    },
    {
      title:'Setting',
      path: '/pages/setting',
      active: false,

    },
    {
      title:'Sync',
      path: '/sync',
      active: true,

    }
  ];
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

    }, {
      title:'Fat SNF',
      tab:'snffat',
      icon:'triangle',
      open: true,

    },
    {
      title:'Advance',
      tab:'advance',
      icon:'triangle',
      open: false,

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
  enableSync=true;
  sync={
    center:{
      f:true,
      b:false
    },
    milk:{
      f:false,
      b:true
    },
    snffat:{
      f:false,
      b:true
    },
    farmer:{
      f:true,
      b:true
    }
  };

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
