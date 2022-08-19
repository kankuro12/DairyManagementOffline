import { SnfFat } from './../../../database/models/snffat.modal';
import { Center } from 'src/app/database/models/center.modal';
import { MilkAmount } from './../../../database/models/milkamount.modal';
/* eslint-disable eqeqeq */
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
  center: Center;
  rate: Rate;

  years: number[]=[];
  months: number[]=[];
  sessions: number[]=[1,2];

  year: number;
  month: number;
  session: number;

  snfAvg: number;
  fatAvg: number;
  rateAmount: number;
  totalAmount: number;
  milkDatas: MilkData[]=[];
  advances: Advance[]=[];
  MilkAmount: MilkAmount;
  hasMilkAmount=false;

  curSession: number;
  m_total=0;
  e_total=0;
  totalAdvance=0;
  grandTotal=0;
  prev=0;

  loaded=false;
  detailLoaded=false;
  showDetail=false;
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
    this.month=parseInt(nepaliDate.getMonth(),10)+1;
    if(nepaliDate.getDate()>15){
      this.session=2;
    }else{
      this.session=1;
    }
    this.farmer_id=parseInt( this.route.snapshot.paramMap.get('id'),10);
    this.farmer=await this.db.selectONE(Farmer,"select * from farmers where id=?",[this.farmer_id]);
    this.rate=await this.db.selectONE(Rate,"Select * from rates where id=?",[this.farmer.type]);
    this.center=await this.db.selectONE(Center,"Select * from centers where id=?",[this.farmer.center_id]);
    this.loaded=true;

  }


  async loadData(){
    this.detailLoaded=false;
      const range=Helper.getSessionRange(this.year,this.month,this.session);
      console.log(await this.db.select(SnfFat,"select * from snffats where  date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id]));
      this.curSession=Helper.makeIntegerSession(this.year,this.month,this.session);

      console.log([...range,this.farmer_id]);
      this.milkDatas=await this.db.select(MilkData,"select * from milkdatas where date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id]);
      this.advances=await this.db.select(Advance,"select * from advances where date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id]);
      this.MilkAmount=await this.db.selectONE(MilkAmount,"select * from milkamounts where user_id=? and session=?",[this.farmer_id,this.curSession]);

      const prevMilk=(await this.db.run("select sum(rate*amount) as total from milkamounts where session<? and user_id=?",[this.curSession,this.farmer_id])).rows.item(0)??0;
      const prevAdvance=(await this.db.run("select sum(amount) as total from advances where date<? and user_id=?",[range[0],this.farmer_id])).rows.item(0)??0;
      if(this.setting.rateType==2){
        this.snfAvg=(await this.db.run("select avg(snf) as total from snffats where  date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id])).rows.item(0).total??0;
        this.fatAvg=(await this.db.run("select avg(fat) as total from snffats where  date>= ? and date<= ? and user_id=? ",[...range,this.farmer_id])).rows.item(0).total??0;
      }
      this.prev=prevMilk.total-prevAdvance.total;
      console.log(this.snfAvg,this.fatAvg,"prev balance");
      this.hasMilkAmount=this.MilkAmount!=null;
      this.calculateTotal();

  }

  milkUpdated(m){
    this.calculateTotal();

  }
  advanceUpdated(m){
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

    if(this.hasMilkAmount){
      this.rateAmount=this.MilkAmount.rate;
    }else{

      if(this.setting.rateType==1){
        this.rateAmount=this.rate.rate;
      }else{
        this.rateAmount=(this.snfAvg*this.center.snf_rate)+(this.fatAvg*this.center.fat_rate);
      }
    }
    this.totalAmount=((this.m_total+this.e_total)*this.rateAmount);
    this.advances.forEach((data)=>{
      this.totalAdvance+=data.amount;
    });
    this.grandTotal=this.totalAmount-this.totalAdvance+this.prev;
    if(!this.hasMilkAmount){
      if(this.setting.rateType==1){
        this.MilkAmount=new MilkAmount({session:this.curSession,user_id:this.farmer_id,rate:this.rateAmount,amount:(this.m_total+this.e_total)});
      }else{

      }
    }
    this.detailLoaded=true;

  }

  saveMilkAmount(){
    this.MilkAmount.save()
    .then((res)=>{
      this.hasMilkAmount=true;
    });
  }
}
