/* eslint-disable eqeqeq */
import { AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Rate } from './../database/models/rate.modal';
import { MilkData } from './../database/models/milkdata.modal';
import { Farmer } from './../database/models/farmer.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Center } from './../database/models/center.modal';
import { SqlliteService } from './../services/sqllite.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import NepaliDate from "nepali-date";
import { Helper } from "../utli/helper";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('noinput') noInput: ElementRef;
  @ViewChild('amountinput') amountInput: ElementRef;
  inititated = false;
  center: Center;
  centers: Center[] = [];
  center_id: number;
  farmers: Farmer[] = [];
  rates: Rate[] = [];
  rate: Rate;
  farmer: Farmer;
  milkData: MilkData;
  milkDatas: any[] = [];
  date: string;
  curDate: number;
  loaded = false;
  session = "Morning";
  //date entry
  no: number;
  amount: number;
  milkDataSaving = false;
  //add farmer
  fname = '';
  rate_id: number;
  farmerSaving = false;
  //modal
  isModalOpen = false;
  //totals
  totals = [0, 0];
  totalRates = [];
  totalRatesLine = [0,0];




  constructor(private db: SqlliteService,    private changeDetection: ChangeDetectorRef ,private alertController: AlertController   ) {
    const d4 = new NepaliDate(new Date());
    this.date = d4.format('YYYY-MM-DD');

  }

  async updateTotal() {
    const localTotals = [0, 0];
    const localTotalRates = [];
    for (const rate of this.rates) {
      localTotalRates['rate_id' + rate.id] = { name: rate.name, total: 0, rate: rate.rate };
    }


    for (let index = 0; index < this.milkDatas.length; index++) {
      const milkData = this.milkDatas[index];
      localTotals[0] += milkData.m_amount;
      localTotals[1] += milkData.e_amount;
      localTotalRates['rate_id' + milkData.type].total += milkData.m_amount + milkData.e_amount;
    }
    this.totals = localTotals;
    this.totalRates=[];
    this.totalRatesLine = [0,0];

    for (const key in localTotalRates) {
      if (Object.prototype.hasOwnProperty.call(localTotalRates, key)) {
        const o = localTotalRates[key];
        this.totalRates.push([o.name,o.rate,o.total]);
        this.totalRatesLine[0]+=o.total;
        this.totalRatesLine[1]+= o.total*o.rate;
      }
    }


  }
  async ngOnInit() {
    this.centers = await this.db.select(Center, "select id,name from centers", []);
    this.rates = await this.db.select(Rate, "select id,name,rate from rates", []);
    if (this.centers.length > 0) {
      this.center = this.centers[0];
      this.center_id = this.center.id;
    }
    if (this.rates.length > 0) {
      this.rate = this.rates[0];
      this.rate_id = this.rate.id;
    }

    this.inititated = true;

  }

  isNumber(num) {
    return num !== undefined && num !== null && !isNaN(num);
  }

  check(e) {
    if (e.keyCode === 13) {
      this.save();
    }

  }

  save() {

    if (!this.isNumber(this.no)) {
      alert("Please Enter Farmer No");
      this.noInput.nativeElement.focus();
      return;
    }

    if (!this.isNumber(this.amount)) {
      alert(`Please Enter Milk amount for ${this.session} `);
      this.amountInput.nativeElement.focus();
      return;
    }
    if (this.amount === 0) {
      alert(`Please Enter Milk amount for ${this.session} `);
      this.amountInput.nativeElement.focus();
      return;
    }


    this.farmer = this.farmers.find(o => o.no === this.no);
    this.milkDataSaving = true;
    if (this.farmer == null) {
      this.initFarmerAdd();
    } else {
      this.saveMilkData();
    }
  }

  initFarmerAdd() {
    this.isModalOpen = true;
  }

  async saveFarmer() {
    this.farmerSaving = true;
    this.farmer = new Farmer({ no: this.no, name: this.fname, type: this.rate_id, center_id: this.center_id });
    this.farmer.save()
      .then((f: Farmer) => {
        this.farmers.push(f);
        this.farmerSaving = false;
        this.isModalOpen = false;
        this.fname = '';
        this.saveMilkData();

      })
      .catch((err) => {
        console.log(err);
        this.farmerSaving = false;
      });
  }

  async saveMilkData() {
    const localData = this.milkDatas.find(o => o.user_id === this.farmer.id && o.date === this.curDate);

    console.log(this.farmer, localData, this.farmers);
    let needConformation=false;
    if (localData != null) {
        const milkData=await this.db.selectONE(MilkData,"select * from milkdatas where id=?",[localData.id]);
        console.log(milkData,this.session);

        if(this.session==='Morning' && milkData.m_amount>0){
          needConformation=true;
        }else if(this.session==='Evening' && milkData.e_amount>0){
          needConformation=true;
        }
        if(needConformation){
          this.alertController.create({
            message:`There is already data for farmer no ${localData.no} in ${this.session} Session.Please Choose a Option.` ,
            buttons:[
              {
              text:"Add Milk",
              handler:()=>{
                if(this.session==='Morning' ){
                  milkData.m_amount+=this.amount;
                }else if(this.session==='Evening' ){
                  milkData.e_amount+=this.amount;
                }
                this.updateMilkData(milkData);
              }
            },
            {
              text:"Update Milk",
              handler:()=>{
                if(this.session==='Morning' ){
                  milkData.m_amount=this.amount;
                }else if(this.session==='Evening' ){
                  milkData.e_amount=this.amount;
                }
                this.updateMilkData(milkData);
              }
            },
            {
              text:"Cancel Process",
              role:"cancel"
            }
          ]

          }).then((alert)=>alert.present());
        }else{
          if(this.session==='Morning' ){
            milkData.m_amount=this.amount;
          }else if(this.session==='Evening' ){
            milkData.e_amount=this.amount;
          }
          this.updateMilkData(milkData);
        }

    } else {
      const milkData = new MilkData({
        user_id: this.farmer.id,
        date: this.curDate,
        center_id: this.center_id,
        m_amount: this.session === 'Morning' ? this.amount : 0,
        e_amount: this.session === 'Evening' ? this.amount : 0,
      });
      milkData.save()
        .then((m: MilkData) => {
          this.milkDatas.push(this.getMappedData(m));
          this.finishedSaving();
        })
        .catch((err) => {
          this.milkDataSaving = false;

        });
    }
  }


  getMappedData(m: MilkData){

    return {
      id: m.id,
      m_amount: m.m_amount,
      e_amount: m.e_amount,
      no: this.farmer.no,
      date:m.date,
      name: this.farmer.name,
      user_id: m.user_id,
      type: this.farmer.type
    };
  }

  finishedSaving(){
    this.milkDataSaving = false;
          this.no = null;
          this.amount = null;
          this.noInput.nativeElement.focus();
          this.updateTotal();
  }

  loadData() {

    if (!Helper.checkDate(this.date)) {
      alert("Please enter Date");
      return;
    }
    this.curDate = Helper.dateINT(this.date);
    this.db.select(Farmer, "select * from farmers where center_id=?", [this.center.id])
      .then((f) => {
        this.farmers = f;
        this.db.selectLoose(`select m.id,f.no,m_amount,e_amount,name,user_id,f.type,m.date
      from milkdatas m
      join farmers f on m.user_id=f.id
      where date=? and m.center_id=?`, [this.curDate, this.center.id])
          .then((results) => {
            this.loaded = true;
            this.milkDatas = results;
            this.updateTotal();
          })
          .catch((err) => {
            console.log(err);

          });
      });

  }

  updateMilkData(milkData: MilkData){
    milkData.save()
    .then((m: MilkData)=>{
      const mappedData=this.getMappedData(m);
      console.log(mappedData);
      // const localMilkDatas=[...this.milkDatas];
      // const index=localMilkDatas.findIndex(o => o.user_id == this.farmer.id && o.date == this.curDate);
      const index=this.milkDatas.findIndex(o => o.user_id == this.farmer.id && o.date == this.curDate);
      // console.log(index);
      // localMilkDatas[index]=mappedData;
      // this.milkDatas=localMilkDatas;
      this.milkDatas[index]=mappedData;
      this.finishedSaving();

    }).catch((err)=>{
      console.log(err);

    });
  }

  currentEstimate() {
    this.updateTotal();


  }

}
