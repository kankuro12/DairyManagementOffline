import { LoadingController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
import { Customer } from './../../database/models/customer.modal';
import { AuthService } from './../../services/auth.service';
/* eslint-disable max-len */
import { SqlliteService } from './../../services/sqllite.service';
import { ChalanPayment } from './../../database/models/chalanpayment';
import { ChalanSellItem } from './../../database/models/chalansellitem';
import { Helper } from './../../utli/helper';
import { Component, OnInit } from '@angular/core';
import NepaliDate from "nepali-date";

@Component({
  selector: 'app-sellitemreport',
  templateUrl: './sellitemreport.component.html',
  styleUrls: ['./sellitemreport.component.scss'],
})
export class SellitemreportComponent implements OnInit {
  date = '';
  curDate: number;
  sellItems: ChalanSellItem[] = [];
  payments: ChalanPayment[] = [];
  sellingType=1;
  customers: Customer[]=[];
  canupload=false;
  loading: HTMLIonLoadingElement;
  hasPermission=false;

  constructor(private db: SqlliteService, private auth: AuthService,private api: ApiService,private loadingController: LoadingController) { }

  toPromise(call){
    return new Promise((resolve,reject)=>{
      call.subscribe(val=>resolve(val),(err)=>reject(err));
    });
  }
  async ngOnInit() {
    // this.hasPermission=this.auth.user

      const localDate = new Date();
      const d4 = new NepaliDate(localDate);
      this.date = d4.format('YYYY-MM-DD');
      this.curDate = Helper.dateINT(this.date);
      this.customers = await this.db.select(Customer, "select * from customers");


  }

  async loadData(){
    this.canupload=false;
    this.sellItems = await this.db.select(ChalanSellItem, 'select * from chalansellitems where date=? and user_id=?', [ this.curDate, this.auth.user.id]);
    this.payments = await this.db.select(ChalanPayment, 'select * from chalanpayments where date=? and user_id=?', [ this.curDate, this.auth.user.id]);

    console.log(this.sellItems,this.payments);
    this.canupload=(this.sellItems.filter(o=>o.sync!=1).length + this.payments.filter(o=>o.sync!=1).length)>0;
  }


  getName(phone){
    return this.customers.find(o=>o.phone===phone).name;
  }

  async upload(){
    this.loading=await this.loadingController.create({
      message:'Uploading Chalan Data'
    });
    this.loading.present();
    console.log('uploading Data');
    const sellItemUploads=this.sellItems.filter(o=>o.sync!=1);
    for (let index = 0; index < sellItemUploads.length; index++) {
      const sellItem = sellItemUploads[index];
      try {
        const pushSellItem: any=sellItem;
        pushSellItem.name=this.getName(pushSellItem.phone);
        const data: any=await this.toPromise(this.api.post('upload-chalansales',pushSellItem));
        if(data.status){
          sellItem.sync=1;
          await sellItem.save();
        }else{
          alert(data.message);
          this.loading.dismiss();
          this.canupload=(this.sellItems.filter(o=>o.sync!=1).length + this.payments.filter(o=>o.sync!=1).length)>0;
          return;
        }
      } catch (error) {

      }
    }
    const paymentUploads=this.payments.filter(o=>o.sync!=1);
    for (let index = 0; index < paymentUploads.length; index++) {
      const payment = paymentUploads[index];
      try {
        const pushPayment: any=payment;
        pushPayment.name=this.getName(pushPayment.phone);
        const data: any=await this.toPromise(this.api.post('upload-chalanpayment',pushPayment));
        if(data.status){
          payment.sync=1;
          await payment.save();
        }else{
          alert(data.message);
          this.loading.dismiss();
          this.canupload=(this.sellItems.filter(o=>o.sync!=1).length + this.payments.filter(o=>o.sync!=1).length)>0;
          return;
        }

      } catch (error) {
        console.error(error);
      }
    }
    this.canupload=(this.sellItems.filter(o=>o.sync!=1).length + this.payments.filter(o=>o.sync!=1).length)>0;

    this.loading.dismiss();
  }
}
