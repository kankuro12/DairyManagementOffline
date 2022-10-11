import { Helper } from './../utli/helper';
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Bill } from './../database/models/bill.modal';
import { SqlliteService } from 'src/app/services/sqllite.service';
import { ApiService } from './api.service';
import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellItemSync {
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
      await this.db.run('delete from bills where date is null',[]);
      const bills = await this.db.select(Bill, 'select * from bills where sync=0');
      for (let index = 0; index < bills.length; index++) {
        const bill = bills[index];

        const pushBill: any =bill;
        pushBill.due=(bill.paid<(bill.total-bill.discount))?(bill.total-bill.discount-bill.paid):0;
        this.total=bills.length;
        const data: any = await Helper.toPromise(this.api.post('app/sell',pushBill));

        if(data.status){
          bill.sync=1;
          await bill.save();
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
