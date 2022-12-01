/* eslint-disable eqeqeq */
import { AuthService } from './../services/auth.service';
import { CustomerPaymentSync } from './../services/customerpaymentsync.services';
import { CustomerPayment } from './../database/models/customerpayment.modal';
import { CustomerSearchService } from './../services/customer-search.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../database/models/customer.modal';
import { ApiService } from '../services/api.service';
import { Helper } from '../utli/helper';
import NepaliDate from "nepali-date";

@Component({
  selector: 'app-customerpayment',
  templateUrl: './customerpayment.page.html',
  styleUrls: ['./customerpayment.page.scss'],
})
export class CustomerpaymentPage implements OnInit {
  customer: Customer;
  showSearch=false;
  customerLoaded=false;
  loading = false;

  amount: number;
  date: string;
  curDate: number;
  cr: number;
  dr: number;
  saving= false;
  constructor(public search: CustomerSearchService,public api: ApiService,public sync: CustomerPaymentSync,private auth: AuthService) { }

  ngOnInit() {

  }

  apiCall(){
    this.loading=true;
    this.api.get('app/customer-due/'+this.customer.phone)
    .subscribe((data: any)=>{
      console.log(data);
      this.cr=data.cr!=null?parseFloat(data.cr):0;
      this.dr=data.dr!=null?parseFloat(data.dr):0;
      console.log(this.cr,this.dr);
      this.loading=false;
    });
  }

  save(){
    this.saving=true;
    if(!(Helper.isNumber(this.amount)|| this.amount<=0)){
      alert('Please enter amount');
      return;
    }

    if(!Helper.checkDate(this.date)){
      alert('Please enter correct date');
      return;
    }
    this.curDate = Helper.dateINT(this.date);

    const payment=new CustomerPayment({
      date:this.curDate,
      amount:this.amount,
      phone:this.customer.phone,
      name:this.customer.name,
    });
    payment.save()
    .then((cus: Customer)=>{
      // if(this.auth.loginMode==1){
      // }
      this.sync.sync();

      console.log(typeof(this.cr));
      this.cr+=this.amount;
      this.amount=null;
      this.saving=false;
    })
    .catch((err)=>{
      alert('Some Error occured please try again');
      this.saving=false;
    });
  }

  selected(cus){
    this.customer=cus;
    console.log(this.customer);
    this.showSearch=false;
    this.customerLoaded=true;
    this.apiCall();
    const localDate = new Date();
    const d4 = new NepaliDate(localDate);
    this.date = d4.format('YYYY-MM-DD');
    this.curDate = Helper.dateINT(this.date);
  }

}
