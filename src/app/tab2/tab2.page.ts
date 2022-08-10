import { Farmer } from './../database/models/farmer.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Center } from './../database/models/center.modal';
import { SqlliteService } from './../services/sqllite.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import  NepaliDate  from "nepali-date";
import { Helper } from "../utli/helper";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('noinput') noInput: HTMLInputElement;
  @ViewChild('amountinput') amountInput: HTMLInputElement;
  center: Center;
  centers: Center[]=[];
  farmers: Farmer[]=[];
  milkDatas: any=[];
  date: string;
  curDate: number;
  loaded=false;
  session="Morning";

  //date entry
  no: number;
  amount: number;


  constructor(private db: SqlliteService) {
    const d4 = new NepaliDate(new Date());
    this.date=d4.format('YYYY-MM-DD');

  }
  async ngOnInit() {
    this.centers=await this.db.select(Center,"select id,name from centers",[]);
    console.log(this.centers);

    if(this.centers.length>0){
      this.center=this.centers[0];
    }

  }

  isNumber(num){
    return num!==undefined && num!==null && !isNaN(num);
  }

  check(e){
    console.log(e);
    if(e.keyCode===13){
      this.save();
    }

  }

  save(){
    console.log(this.noInput,this.amountInput);

    if(this.isNumber(this.no)){
      alert("Please Enter Farmer No");
      return;
    }
    if(this.isNumber(this.no)){
      alert("Please Enter Farmer No");
      return;
    }
  }

  loadData(){
    console.log(this.session,this.date,this.center);

    if(!Helper.checkDate(this.date)){
      alert("Please enter Date");
      return;
    }
     this.curDate=Helper.dateINT(this.date);
    this.db.select(Farmer,"select * from farmers where center_id=?",[this.center.id])
    .then((f)=>{
      this.farmers=f;
      this.db.selectLoose(`select m.id,f.no,m_amount,e_amount,name
      from milkdatas m
      join farmers f on m.user_id=f.id
      where date=? and m.center_id=?`,[this.curDate,this.center.id])
      .then((results)=>{
        this.loaded=true;
        console.log(results);
      })
      .catch((err)=>{
        console.log(err);

      });
    });

  }

}
