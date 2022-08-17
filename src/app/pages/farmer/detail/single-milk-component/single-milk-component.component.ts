/* eslint-disable @typescript-eslint/naming-convention */
import { AlertController } from '@ionic/angular';
import { Helper } from './../../../../utli/helper';
import { MilkData } from './../../../../database/models/milkdata.modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-single-milk-component',
  templateUrl: './single-milk-component.component.html',
  styleUrls: ['./single-milk-component.component.scss'],
})
export class SingleMilkComponentComponent implements OnInit {
  @Input() milkData: MilkData;
  @Output() updated=new EventEmitter<any>();
  date='';
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.date=Helper.dateSTR(this.milkData.date);
  }

  initUpdate(){
    console.log(this.milkData);

    this.alertController.create({
      message:"Do you want to update milk data",
      buttons:[
        {
          text:"Yes",
          handler:()=>{
            this.milkData.save();
            this.updated.emit({id:this.milkData.id,m_amount: this.milkData.m_amount,e_amount: this.milkData.e_amount});
          },
        },
        {
          text:"No",
          role: "cancel",
          cssClass:"text-danger"
        }
      ]
    }).then((alert)=>alert.present());
  }
  update(){


  }



}
