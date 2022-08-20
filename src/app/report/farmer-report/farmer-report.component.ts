import { MilkAmount } from './../../database/models/milkamount.modal';
import { SettingsService } from 'src/app/services/settings.service';
import { Rate } from 'src/app/database/models/rate.modal';
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { SqlliteService } from 'src/app/services/sqllite.service';
import { Center } from 'src/app/database/models/center.modal';
import { Component, OnInit } from '@angular/core';
import { loadavg } from 'os';
import { range } from 'rxjs';

@Component({
  selector: 'app-farmer-report',
  templateUrl: './farmer-report.component.html',
  styleUrls: ['./farmer-report.component.scss'],
})
export class FarmerReportComponent implements OnInit {
  centers: Center[];
  rates: Rate[];
  center_id: number;
  initiated = false;
  dataLoaded = false;
  dataLoading = false;
  snfAvgs = [];
  fatAvgs = [];
  farmerDatas = [];
  filterFarmerDatas=[];
  centerName="";
  curSession="";

  constructor(private db: SqlliteService, public setting: SettingsService) { }

  async ngOnInit() {
    this.centers = await this.db.select(Center, "select * from centers", []);
    this.rates = await this.db.select(Rate, "select * from rates", []);
    if (this.centers.length > 0) {
      this.center_id = this.centers[0].id;
    }
    this.initiated = true;
  }
  async loadData(data) {
    if (this.dataLoading) {
      return;
    }
    this.dataLoaded = false;
    const center = this.centers.find(o => o.id == this.center_id);
    this.centerName=center.name;
    this.curSession=data.year+"/"+data.month+"/"+data.session;
    const farmers = await this.db.selectLoose("select id,no,name,type from farmers where center_id=?", [this.center_id]);
    if (farmers.length == 0) {
      this.dataLoading = false;
      return;
    }
    console.log("Data", data, await this.db.selectLoose('select * from advances where date<?', [data.range[0]]));
    const ids = farmers.map(o => o.id).join(',');
    const prevAdvances = await this.db.selectLoose(`select sum(amount) as total,user_id from advances where date<? and user_id in (${ids}) group by user_id`, [data.range[0]]);
    const prevMilkAmounts = await this.db.selectLoose(`select sum(rate*amount) as total,user_id from milkamounts where session<? and user_id in (${ids}) group by user_id`, [data.curSession]);

    const currentAdvances = await this.db.selectLoose(`select sum(amount) as total,user_id from advances where date>= ? and date<=? and user_id in (${ids}) group by user_id`, data.range);

    if (this.setting.rateType == 2) {
      this.snfAvgs = await this.db.selectLoose(`select avg(snf) as avg,user_id from snffats where date>= ? and date<=? and user_id in (${ids}) group by user_id`, data.range);
      this.fatAvgs = await this.db.selectLoose(`select avg(fat) as avg,user_id from snffats where date>= ? and date<=? and user_id in (${ids}) group by user_id`, data.range);
    }

    const currentMilkAmounts = await this.db.selectLoose(`select sum(m_amount+e_amount) as total,user_id from milkdatas where date>= ? and date<=? and user_id in (${ids}) group by user_id`, data.range);
    this.farmerDatas = farmers.map(farmer => {
      const fdata = {no:farmer.no,name:farmer.name,id:farmer.id,session:data.curSession};

      //current data
      let rate = 0;
      let snf=0;
      let fat=0;
      if (this.setting.rateType == 1) {
        rate = this.rates.find(o => o.id == farmer.type).rate;
      } else {
         snf = this.getData(this.snfAvgs,farmer.id,'avg');
         fat = this.getData(this.fatAvgs,farmer.id,'avg');
          rate=snf*center.snf_rate+fat*center.fat_rate;
      }
      const milkAmount=this.getData(currentMilkAmounts,farmer.id,'total');
      const milkTotal=milkAmount*rate;
      const advance=this.getData(currentAdvances,farmer.id,'total');
      const prevMilkTotal=this.getData(prevMilkAmounts,farmer.id,'total');
      const prevAdvance=this.getData(prevAdvances,farmer.id,'total');
      const prev=prevMilkTotal-prevAdvance;
      const prevDue=prev<0?(-1*prev):0;
      const prevBalance=prev>0?prev:0;
      const current=milkTotal+prev-advance;
      const due=current<0?(-1*current):0;
      const balance=current>0?current:0;

      if(this.setting.rateType==1){
        return {...fdata,rate,milkAmount,milkTotal,advance,prevBalance,prevDue,balance,due};
      }else{
        return {...fdata,fat,snf,rate,milkAmount,milkTotal,advance,prevBalance,prevDue,balance,due};

      }
    });
    this.dataLoaded=true;
    this.dataLoading = false;
    this.filterFarmerDatas=this.farmerDatas;
    console.log(this.farmerDatas, center);

  }

  search(e){
    const key = e.target.value.toLowerCase();
    this.filterFarmerDatas=this.farmerDatas.filter(o=> o.name.toLowerCase().includes(key)|| o.no.toString().includes(key));
  }

  getData(array=[],user_id,column): number{
    const data=array.find(o=>o.user_id==user_id);
    if(data!=undefined){
      return data[column];
    }else{
      return 0;
    }
  }


}
