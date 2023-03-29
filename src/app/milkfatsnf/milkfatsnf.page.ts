/* eslint-disable arrow-body-style */
import { MilkData } from './../database/models/milkdata.modal';
/* eslint-disable no-underscore-dangle */
import { MilkAmount } from './../database/models/milkamount.modal';
/* eslint-disable eqeqeq */
import { AuthService } from './../services/auth.service';
import { ApiService } from './../services/api.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { SqlliteService } from './../services/sqllite.service';
import { Farmer } from './../database/models/farmer.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Center } from './../database/models/center.modal';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import NepaliDate from "nepali-date";
import { Helper } from "../utli/helper";

@Component({
  selector: 'app-milkfatsnf',
  templateUrl: './milkfatsnf.page.html',
  styleUrls: ['./milkfatsnf.page.scss'],
})
export class MilkfatsnfPage implements OnInit {
  centers: Center[] = [];
  center_id: number;
  farmers: Farmer[] = [];
  selectedFarmers: Farmer[] = [];

  center: Center= new Center({name:"no center loaded"});
  date: string;
  session = 0;
  //for current data
  no: number = null;
  snf: number= null;
  fat: number= null;
  amount: number = null;

  todayDate: number;
  dateLoaded=false;
  nofocused=false;

  MilkDatas: any[] =[];

  //editing
  isEditing=false;
  e_id: number = null;
  e_snf: number= null;
  e_fat: number= null;
  e_amount: number = null;

  loading: any ;


  constructor(private db: SqlliteService,
    private changeDetection: ChangeDetectorRef,
    private alertController: AlertController,
    public setting: SettingsService,
    private loadingCtrl: LoadingController,
    private api: ApiService,
    public auth: AuthService,
    private actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.auth.offlineLogin("23232323","23232323");
    const apiPer="("+this.auth.user.apiper.join(',')+")";
    this.centers = await this.db.select(Center, `select id,name from centers where id in ${apiPer}`, []);
    if(this.centers.length==1){
      this.center=this.centers[0];
      this.center_id=this.center.id;
    }
    console.log(this.centers);

    const localDate = new Date();
    this.session = localDate.getHours() < 12 ? 0 : 1;
    const d4 = new NepaliDate(localDate);
    this.date = d4.format('YYYY-MM-DD');
    this.todayDate= Helper.dateINT(this.date);
    this.farmers=await this.db.select(Farmer,"select * from farmers");
    this.selectedFarmers=this.farmers;
    // this.db.run('delete from milkamounts');

  }

  async loadData(){
    this.dateLoaded=true;
    this.MilkDatas = await this.db.select(MilkAmount,"select * from milkamounts where center_id ="+this.center_id,[]);
    console.log(this.MilkDatas);

    // eslint-disable-next-line arrow-body-style
    this.MilkDatas=this.MilkDatas.map(o=>{
      const farmer=this.farmers.find(f=>f.id==o.user_id);
      return {
        ...o,
        name:farmer.name,
        no:farmer.no,
      };
    });

  }


  resetSelectFarmer(){
    this.selectedFarmers=this.farmers;
    this.nofocused=false;
 }

  selectFarmer(no){
    console.log(no);

    this.no=no;

    this.selectedFarmers=this.farmers;
    this.nofocused=false;
    document.getElementById('milk').focus();
  }



  selectFarmers(e){
    console.log(e.target.id);
    const keyword=e.target.value;
    if(e.target.id=="sno"){
      this.selectedFarmers=this.farmers.filter(o=>o.name.toLowerCase().startsWith(keyword.toLowerCase()));

    }else{

      this.selectedFarmers=this.farmers.filter(o=>o.no.toString().startsWith(keyword));
    }
  }

  focusOut(e){
    if(e.relatedTarget!=null && e.relatedTarget.id!="sno"){
      this.nofocused=false;
    }
  }


  checkSave(e){
    console.log(e);
    if(e.keyCode==13){
      this.saveData();
    }

  }

  saveData(){
    if( this.no==null){
      alert("Please enter Farmer no");
      document.getElementById('no').focus();
      return;
    }

    console.log(this.no,this.fat,this.snf,this.amount);
    const farmer=this.farmers.find(o=>o.no==this.no);
    if(farmer==undefined){
      alert("Farmer With farmer no doesnot exists");
      document.getElementById('no').focus();
      return;
    }
    if( this.amount==null){
      alert("Please enter Milk amount");
      document.getElementById('milk').focus();
      return;
    }

    if(this.fat==null && this.snf!=null){
      alert("Please enter fat %");
      document.getElementById('fat').focus();
      return;
    }

    if(this.fat!=null && this.snf==null){
      alert("Please enter snf %");
      document.getElementById('snf').focus();
      return;
    }

    const index=this.MilkDatas.findIndex(o=>o.user_id==farmer.id && o.date==this.todayDate && o.session==this.session);
    if(index>-1){
      if(confirm(`The Milk for ${farmer.name} (${farmer.no}) is already added. Do you want to add this again.`)){

      }else{
        document.getElementById('no').focus();
        return;
      }
    }

    (new MilkAmount({
      session:this.session,
      amount:this.amount,
      snf:this.snf,
      fat:this.fat,
      center_id:this.center_id,
      user_id:farmer.id,
      date:this.todayDate,

    })).save()
    .then((milkAmount: any)=>{
      console.log(milkAmount);

      const _farmer=this.farmers.find(f=>f.id==milkAmount.user_id);
      milkAmount.name=_farmer.name;
      milkAmount.no=_farmer.no;
      this.MilkDatas.unshift(milkAmount);
      this.no=null;
      this.snf=null;
      this.fat=null;
      this.amount=null;
      document.getElementById('no').focus();
    });
  }

  //init edit delete
  showDetail(milkData){
    this.e_id=milkData.id;
    this.e_snf=milkData.snf;
    this.e_fat=milkData.fat;
    this.e_amount=milkData.amount;
    this.isEditing=true;
  }

  resetEdit(){
    this.isEditing=false;
    this.e_id=null;
    this.e_snf=null;
    this.e_fat=null;
    this.e_amount=null;
  }

  updateData(){
    if(confirm('Do you want to continue')){
      this.db.run('update milkamounts set amount=?,fat=?,snf=? where id=?',[this.e_amount,this.e_fat,this.e_snf,this.e_id])
      .then(()=>{
        const index=this.MilkDatas.findIndex(o=>o.id==this.e_id);
        this.MilkDatas[index].amount=this.e_amount;
        this.MilkDatas[index].fat=this.e_fat;
        this.MilkDatas[index].snf=this.e_snf;
      });
    }
  }



  deleteData(){
    if(confirm("Do you want to continue")){

      this.db.run('delete from milkamounts where id=?',[this.e_id])
      .then(()=>{
        const index=this.MilkDatas.findIndex(o=>o.id==this.e_id);
        this.MilkDatas.splice(index,1);
        this.resetEdit();
      });
    }
  }


  //upload data

  uploadData(){
    if(this.MilkDatas.length==0){
      return;
    }
    if(confirm("Do you want to upload data")){

      const ids=this.MilkDatas.map(o=>o.id);

      const data={
        nos:this.MilkDatas.map(o=>o.no),
        center_id:this.center_id,
        session:this.session,
        date:this.todayDate,
        datas:this.MilkDatas.map(o=>{
          return {no:o.no,amount:o.amount,snf:o.snf,fat:o.fat};
        })
      };

      this.api.post("farmers/upload-milkfatsnf",data)
      .subscribe((d: any)=>{
        console.log(d);
        this.db.run(`update milkamounts set sync=1 where id in (${ids.join(",")})`)
        .then(()=>{
          this.loadData();
        });
        alert("Data Uploaded Sucessfully");
      },(err)=>{
        console.log(err);
        alert("Cannot upload data please try again.");
      });
    }
  }

  async showLoading(msg){
    this.loading = await this.loadingCtrl.create({
      message: msg,
      duration: 60000,
    });
    this.loading.present();
  }
}
