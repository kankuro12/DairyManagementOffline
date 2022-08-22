/* eslint-disable eqeqeq */
import { FarmerPayment } from './../../database/models/farmerpayment.modal';
import { EventEmitter, ViewChild, ElementRef } from '@angular/core';
/* eslint-disable max-len */
import { Helper } from './../../utli/helper';
import { SqlliteService } from './../../services/sqllite.service';
import  NepaliDate  from 'nepali-date';
import { Farmer } from './../../database/models/farmer.modal';
import { Rate } from './../../database/models/rate.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Center } from './../../database/models/center.modal';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {
  @Input() type= 1;
  @Output() dataLoad= new EventEmitter<any>();
  @ViewChild('noinput') noInput: ElementRef;
  @ViewChild('amountinput') amountInput: ElementRef;
  center: Center;
  centers: Center[] = [];
  center_id: number;

  farmers: Farmer[] = [];
  farmer: Farmer;

  date: string;
  curDate: number;
  loaded=false;
  payments: any[];

  no: number;
  amount: number;

  initiated=false;
  constructor(private db: SqlliteService) { }


  async ngOnInit() {
    const d4 = new NepaliDate(new Date());
    this.date = d4.format('YYYY-MM-DD');
    this.centers = await this.db.select(Center, "select id,name from centers", []);

    if (this.centers.length > 0) {
      this.center = this.centers[0];
      this.center_id = this.center.id;
    }
    this.initiated=true;
  }

  reset(){
    this.payments=[];
    this.loaded=false;

  }

  loadData(){
    if (!Helper.checkDate(this.date)) {
      alert("Please enter Date");
      return;
    }
    this.db.select(FarmerPayment,'select * from farmerpayments')
    .then((data)=>{
      console.log(data,"data manage");
    });
    this.curDate = Helper.dateINT(this.date);
    this.db.select(Farmer,'select * from farmers where center_id=?',[this.center_id])
    .then((result)=>{

      this.farmers=result;
      this.db.selectLoose('select a.*,f.no,f.name from farmerpayments a join farmers f on a.user_id=f.id where f.center_id=? and date=?',[this.center_id,this.curDate])
      .then((data)=>{
        this.payments=data;
        this.loaded=true;
        this.dataLoad.emit(data);
      })
      .catch((err)=>{

      });
    })
    .catch((err)=>{

    });
  }

  check(e){
    if (e.keyCode === 13) {
      this.save();
    }
  }

  save(){
    if (!this.isNumber(this.no)) {
      alert("Please Enter Farmer No");
      this.noInput.nativeElement.focus();
      return;
    }

    if (!this.isNumber(this.amount)) {
      alert(`Please Enter Advance Amount `);
      this.amountInput.nativeElement.focus();
      return;
    }
    if (this.amount === 0) {
      alert(`Please Enter Advance Amount `);
      this.amountInput.nativeElement.focus();
      return;
    }

    if(this.payments.filter(o=>o.no==this.no && o.type==this.type).length>0){
      if(!(confirm(`There is already payment for farmer no: ${this.no}, Do you want to continue?`))){
        return;
      }
    }

    this.farmer = this.farmers.find(o => o.no === this.no);
    if(this.farmer==null){
      alert('No farmer found with farmer no: '+this.no);
      return;
    }

    const payment=new FarmerPayment({user_id:this.farmer.id,amount:this.amount,date:this.curDate,type:this.type});
    payment.save()
    .then((p: FarmerPayment) =>{
      this.payments.push({...p,no:this.farmer.no,name:this.farmer.name});
      this.no=null;
      this.amount=null;
      this.noInput.nativeElement.focus();
    })
    .catch((err)=>{

    });
  }

  isNumber(num) {
    return num !== undefined && num !== null && !isNaN(num);
  }
}
