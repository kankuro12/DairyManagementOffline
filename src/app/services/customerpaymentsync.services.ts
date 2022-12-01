import { CustomerPayment } from './../database/models/customerpayment.modal';
import { Helper } from './../utli/helper';
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Bill } from './../database/models/bill.modal';
import { SqlliteService } from 'src/app/services/sqllite.service';
import { ApiService } from './api.service';
import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerPaymentSync {
  running = false;
  holding = false;
  total = 0;
  synced = 0;
  constructor(private api: ApiService, private db: SqlliteService) {

  }

  async sync() {

    if (this.running||this.holding) {
      this.holding = true;
      return;
    }

    try {
      this.running = true;
      this.holding=false;
      const payments = await this.db.select(CustomerPayment, 'select * from customerpayments where sync=0');
      for (let index = 0; index < payments.length; index++) {
        const payment = payments[index];

        const pushPayment: any =payment;
        this.total=payments.length;
        const data: any = await Helper.toPromise(this.api.post('app/pay',pushPayment));

        if(data.status){
          payment.sync=1;
          await payment.save();
        }

      }
      this.running=false;
    } catch (error) {
      this.running = false;
      console.log(error);
    }

    if(this.holding){
      this.holding=false;
      this.sync();
    }
  }


}
