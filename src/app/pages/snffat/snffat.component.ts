/* eslint-disable max-len */
import { ElementRef } from '@angular/core';
/* eslint-disable eqeqeq */
import { Helper } from './../../utli/helper';
import { SnfFat } from './../../database/models/snffat.modal';
import { SqlliteService } from 'src/app/services/sqllite.service';
import NepaliDate from 'nepali-date';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Center } from 'src/app/database/models/center.modal';
import { Farmer } from 'src/app/database/models/farmer.modal';
import { ActionSheetController } from '@ionic/angular';
import { of } from 'rxjs';

@Component({
  selector: 'app-snffat',
  templateUrl: './snffat.component.html',
  styleUrls: ['./snffat.component.scss'],
})
export class SnffatComponent implements OnInit {
  @ViewChild('noInput') noInput: ElementRef;
  @ViewChild('snfInput') snfInput: ElementRef;
  @ViewChild('fatInput') fatInput: ElementRef;

  center: Center;
  centers: Center[] = [];
  center_id: number;
  farmers: Farmer[] = [];
  farmer: Farmer;
  snffats: any[] = [];
  snffat: SnfFat;
  loaded = false;
  initiated = false;
  date = '';
  //data take
  no: number;
  snf: number;
  fat: number;
  //edit snf fat
  esnf: number;
  efat: number;
  isEditing = false;

  constructor(private db: SqlliteService, private actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    const d4 = new NepaliDate(new Date());
    this.date = d4.format('YYYY-MM-DD');
    this.centers = await this.db.select(Center, "select id,name from centers", []);

    if (this.centers.length > 0) {
      this.center = this.centers[0];
      this.center_id = this.center.id;
    }

    this.initiated = true;
  }

  canload() {
    return this.snf != undefined && this.snf != null && this.fat != undefined && this.fat != null && this.no != undefined && this.no != null;
  }
  async loadData() {
    const curDate = Helper.dateINT(this.date);
    this.farmers = await this.db.select(Farmer, 'select * from farmers where center_id=?', [this.center_id]);
    this.snffats = await this.db.selectLoose("select s.*,f.no,f.name from snffats s join farmers f on f.id=s.user_id where date=?", [curDate]);
    console.log(this.snffats, "data");
    this.loaded = true;
  }

  saveData() {

    if (!this.canload()) {
      alert("Please Enter full data.");
      return;
    }

    this.farmer = this.farmers.find(o => o.no == this.no);
    if (this.farmer == undefined || this.farmer == null) {
      alert('Farmer Not Found Please Check Again');
      return;
    }

    if (this.snffats.findIndex(o => o.no == this.no) > -1) {
      if (!confirm('There is already snffat data for this farmer, Do you Want to Add again?')) {
        return;
      }
    }

    this.snffat = new SnfFat({ user_id: this.farmer.id, snf: this.snf, fat: this.fat, date: Helper.dateINT(this.date) });
    this.snffat.save()
      .then((s: SnfFat) => {
        this.snffats.push({ ...s, no: this.farmer.no, name: this.farmer.name });
        this.snf = null;
        this.fat = null;
        this.no = null;
        this.noInput.nativeElement.focus();
      })
      .catch((err) => {

      });
  }

  check(e,type) {
    console.log(e,"Edata");

    if (e.keyCode === 13) {
      if(type==1){
        this.saveData();
      }else if(type==2){
        this.updateData();
      }
    }
  }

  async initAction(id) {
    this.snffat = await this.db.selectONE(SnfFat, "select * from snffats where id=?", [id]);
    this.actionSheetController.create({
      header: 'Fat Snf',
      buttons: [
        {
          text: 'Edit',
          role: 'save',
          icon: 'trash',
          id: 'edit-button',
          handler: () => {
            this.isEditing=true;
            this.esnf=this.snffat.snf;
            this.efat=this.snffat.fat;
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'create',
          id: 'delete-button',
          handler: () => {
            if(confirm('Do you want to delete fat snf data?')){
              const localID=this.snffat.id;
              this.snffat.del()
              .then((s)=>{
                const index=this.snffats.findIndex(o=>o.id==localID);
                this.snffats.splice(index,1);
              })
              .catch((err)=>{

              });
            }

          }
        }
      ]
    }).then((action) => action.present());

  }

  updateData(){
    console.log(this.esnf,this.efat,"init update data");
    if(this.esnf != undefined && this.esnf != null && this.efat != undefined && this.efat != null){

      if(confirm('Do you want to update snf fat data')){
        this.snffat.fat=this.efat;
        this.snffat.snf=this.esnf;
        this.snffat.save()
        .then((s: SnfFat)=>{
          const index= this.snffats.findIndex(o=>o.id==this.snffat.id);
          const localFarmer= this.farmers.find(o=>o.id==this.snffat.user_id);
          this.isEditing=false;
          this.efat=null;
          this.esnf=null;
          this.snffats[index]={...this.snffat,no:localFarmer.no,name:localFarmer.name};
        });

      }
    }else{
      alert('Please enter all data');
    }
  }




}
