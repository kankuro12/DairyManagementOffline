/* eslint-disable max-len */
import { Rate } from 'src/app/database/models/rate.modal';
import { Helper } from './../../../utli/helper';
import { MilkData } from './../../../database/models/milkdata.modal';
import  NepaliDate  from 'nepali-date';
import { SqlliteService } from './../../../services/sqllite.service';
import { Farmer } from './../../../database/models/farmer.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { timeStamp } from 'console';
import { SettingsService } from 'src/app/services/settings.service';
import { Advance } from 'src/app/database/models/advance.modal';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  farmer_id: number;
  farmer: Farmer;
  years: number[]=[];
  months: number[]=[];
  sessions: number[]=[1,2];
  rate: Rate;
  year: number;
  month: number;
  session: number;
  rateAmount: number;
  totalAmount: number;
  milkDatas: MilkData[]=[];
  advances: Advance[]=[];
  m_total=0;
  e_total=0;
  totalAdvance=0;
  loaded=false;
  detailLoaded=false;
  constructor(private route: ActivatedRoute, private db: SqlliteService,public setting: SettingsService) { }

  async ngOnInit() {
    const nepaliDate=new NepaliDate(new Date());
    for (let index = 2075; index <=2090; index++) {
      this.years.push(index);
    }
    for (let index = 1; index <= 12; index++) {
      this.months.push(index);

    }

    this.year=nepaliDate.getYear();
    this.month=nepaliDate.getMonth()+1;
    if(nepaliDate.getDate()>15){
      this.session=2;
    }else{
      this.session=1;
    }
    this.farmer_id=parseInt( this.route.snapshot.paramMap.get('id'),10);
    this.farmer=await this.db.selectONE(Farmer,"select * from farmers where id=?",[this.farmer_id]);
    this.rate=await this.db.selectONE(Rate,"Select * from rates where id=?",[this.farmer.type]);
    this.loaded=true;

  }


  async loadData(){
    this.detailLoaded=false;
      const range=Helper.getSessionRange(this.year,this.month,this.session);
      console.log([...range,this.farmer_id]);
      this.milkDatas=await this.db.select(MilkData,"select * from milkdatas where date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id]);
      this.advances=await this.db.select(Advance,"select * from advances where date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id]);
      this.calculateTotal();

  }

  milkUpdated(m){
    this.calculateTotal();

  }

  calculateTotal(){
    this.m_total=0;
    this.e_total=0;
    this.totalAdvance=0;
    this.milkDatas.forEach(data => {
      this.m_total+=data.m_amount;
      this.e_total+=data.e_amount;
    });
    this.advances.forEach((data)=>{
      this.totalAdvance+=data.amount;
    });
    this.detailLoaded=true;

  }
}
