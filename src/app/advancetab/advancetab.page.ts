import { AlertController } from '@ionic/angular';
import { Advance } from './../database/models/advance.modal';
import { Rate } from 'src/app/database/models/rate.modal';
import { ElementRef } from '@angular/core';
/* eslint-disable max-len */
import { Helper } from './../utli/helper';
import  NepaliDate  from 'nepali-date';
import { SqlliteService } from 'src/app/services/sqllite.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Farmer } from './../database/models/farmer.modal';
import { Center } from './../database/models/center.modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-advancetab',
  templateUrl: './advancetab.page.html',
  styleUrls: ['./advancetab.page.scss'],
})
export class AdvancetabPage implements OnInit {
  @ViewChild('noinput') noInput: ElementRef;
  @ViewChild('amountinput') amountInput: ElementRef;
  center: Center;
  centers: Center[] = [];
  center_id: number;
  rates: Rate[] = [];
  rate: Rate;
  farmers: Farmer[] = [];
  farmer: Farmer;
  date: string;
  curDate: number;
  loaded=false;
  advances: any[];

  no: number;
  amount: number;

  //farmer saving
  fname='';
  rate_id: number;
  isModalOpen=false;
  farmerSaving=false;
  //sum
  totalAdvance=0;

  initiated=false;


  constructor(private db: SqlliteService,private alertController: AlertController) { }

  async ngOnInit() {
    const d4 = new NepaliDate(new Date());
    this.date = d4.format('YYYY-MM-DD');
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
    this.initiated=true;
  }

  calculateTotalAdvance(){
    let tempTotal=0;
    this.advances.forEach((advance)=>{tempTotal+=advance.amount;});
    this.totalAdvance=tempTotal;
  }

  loadData(){
    if (!Helper.checkDate(this.date)) {
      alert("Please enter Date");
      return;
    }
    this.curDate = Helper.dateINT(this.date);
    this.db.select(Farmer,'select * from farmers where center_id=?',[this.center_id])
    .then((result)=>{
      this.farmers=result;
      this.db.selectLoose('select a.*,f.no,f.name from advances a join farmers f on a.user_id=f.id where f.center_id=? and date=?',[this.center_id,this.curDate])
      .then((data)=>{
        this.advances=data;
        this.loaded=true;
        this.calculateTotalAdvance();
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

    this.farmer = this.farmers.find(o => o.no === this.no);
    console.log(this.farmer);

    if(this.farmer==null){
      this.isModalOpen=true;
    }else{
      this.saveData();
    }

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
        this.saveData();

      })
      .catch((err) => {
        console.log(err);
        this.farmerSaving = false;
      });
  }

  saveData(){
    const advance=new Advance({user_id:this.farmer.id,date:this.curDate,amount:this.amount,title:'Advance Given'});
    advance.save()
    .then((adv: Advance)=>{
      this.advances.push({
        ...adv,no:this.farmer.no,name:this.farmer.name
      });
      this.calculateTotalAdvance();
    });
  }

  initDelete(data: any){
    this.alertController.create({
      message:`Do you want delete advance for ${data.name}`,
      buttons:[
        {
          text:"yes",
          role:"success",
          handler:()=>{
            this.del(data.id);
          }
        },
        {
          text:"No",
          cssClass:"text-danger",
          role:"cancel"
        }
      ]
    }).then((alert)=>alert.present());

  }
  del(id){
    this.db.run("delete from advances where id=?",[id])
    .then((res)=>{
      const index=this.advances.findIndex(o=>o.id===id);
      if(id>-1){
        this.advances.splice(index,1);
        this.calculateTotalAdvance();
      }
    })
    .catch((err)=>{

    });
  };
  isNumber(num) {
    return num !== undefined && num !== null && !isNaN(num);
  }
}
