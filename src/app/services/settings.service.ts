/* eslint-disable eqeqeq */
import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //1=fixed [eg gai,vaishi] 2=calculate from snf fat
  rateType=2;
  selectParticular=false;
  home=[
    {
      title:'Centers',
      path: '/pages/centers',
      active: false,
      needlogin: false,
    },
    {
      title:'Customers',
      path: '/pages/customers',
      active: true,
      needlogin: false,

    },
    {
      title:'Rates',
      path: '/pages/rates',
      active: false,
      needlogin: true,
    },
    {
      title:'Reports',
      path: '/reports',
      active: false,
      needlogin: true,
    },
    {
      title:'Setting',
      path: '/pages/setting',
      active: true,
      needlogin: false,
    },
    {
      title:'Sync',
      path: '/sync',
      active: true,
      needlogin: true,
    }
  ];
  tabs=[
    {
      title:'Home',
      tab:'tab1',
      icon:'home',
      open: true,
      needlogin: false,

    },
    //dairy employye chalan
    {
      title:'SellItem',
      tab:'sellitem',
      icon:'cash',
      open: true,
      needlogin: false,


    },
    //retail
    {
      title:'Sell Item',
      tab:'calculator',
      icon:'calculator',
      open: false,
      needlogin: false,

    },
    {
      title:'Due Payment',
      tab:'customerpayment',
      icon:'cash',
      open: false,
      needlogin: false,

    },
    {
      title:'collection',
      tab:'customer-collection',
      icon:'cash',
      open: false,
      needlogin: false,

    },


    {
      title:'Collection',
      tab:'milkfatsnf',
      icon:'beaker',
      open: true,
      needlogin: false,

    },
    //dairy data collection
    {
      title:'Milk',
      tab:'tab2',
      icon:'beaker',
      open: false,
      needlogin: false,

    }, {
      title:'Fat SNF',
      tab:'snffat',
      icon:'calculator',
      open: false,
      needlogin: false,

    },
    {
      title:'Advance',
      tab:'advance',
      icon:'triangle',
      open: false,
      needlogin: false,

    },
    {
      title:'Payment',
      tab:'payment',
      icon:'triangle',
      open: false,
      needlogin: false,

    },
    ,
    {
      title:'Report',
      tab:'report',
      icon:'triangle',
      open: false,
      needlogin: false,

    },
    {
      title:'Farmers',
      tab:'farmers',
      icon:'people',
      open: true,
      needlogin: false,

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
      b:false
    },
    bills:{
      f:false,
      b:true,
    },
    customer:{
      f:true,
      b:false,
    }
  };



  customerRoutes=[];


  centers=[];
  setup=false;
  url='';

  open=[true,true,true,false,false];
  constructor() {

    const rateTypeSTR=localStorage.getItem('rate_type');
    if(rateTypeSTR!=null){
        this.rateType=parseInt(rateTypeSTR,10);
    }else{
      localStorage.setItem('rate_type',this.rateType.toString());
    }

    const selectParticularSTR=localStorage.getItem('setSelectParticular');
    if(selectParticularSTR!=null){
        this.selectParticular=JSON.parse(selectParticularSTR);
    }else{
      localStorage.setItem('setSelectParticular',this.selectParticular.toString());
    }

    this.setup=localStorage.getItem('url')!=null;
    if(this.setup){
      this.url=localStorage.getItem('url');
    }
    const centersSTR=localStorage.getItem('centers');
    if(centersSTR!=null){
      this.centers=JSON.parse(centersSTR);
    }
    const customerRouteStr=localStorage.getItem('customerroute.items');
    if(customerRouteStr!=null && customerRouteStr!=undefined){
      this.customerRoutes=JSON.parse(customerRouteStr);
    }
   }


   setRateType(type){
    this.rateType=type;
    localStorage.setItem('rate_type',this.rateType.toString());
   }

   setSelectParticular(val){
    this.selectParticular=val;
    localStorage.setItem('setSelectParticular',this.selectParticular.toString());

   }
}
