import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/database/models/rate.modal';
import { SqlliteService } from 'src/app/services/sqllite.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements OnInit {

  rates: Rate[];
  mode=0;
  rate: Rate;
  working=false;
  constructor(private db: SqlliteService,private alert: AlertController) { }

  async ngOnInit() {
    this.rates=await this.db.select(Rate,"select * from rates",[]);
  }


  save(){
    console.log(this.rate);
    if(this.rate.name===(undefined) || this.rate.name===null){
      alert("Please Enter name");
      return;
    }
    this.working=true;
    this.rate.save()
    .then((localRate: Rate)=>{
      console.log(localRate);

      const index = this.rates.findIndex((obj => obj.id === localRate.id));
      if(index>=0){
        this.rates[index]=localRate;
      }else{
        this.rates.push(localRate);
      }
      this.mode=0;
      this.working=false;

    })
    .catch((err)=>{
      console.log(err);
      this.working=false;
      this.alert.create({
        message:`Some error occured please try again`,
        buttons:['OK']
      }).then((box)=>{box.present();});
    });

  }

  initDelete(rate: Rate){
    this.working=true;
    this.alert.create({
      message:"Do you want to delete rate?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
              rate.del()
              .then((result: any)=>{
                this.working=false;
                if(result.status){
                  alert("Rate Deleted Sucessfully");
                  const index = this.rates.findIndex((obj => obj.id === rate.id));
                  this.rates.splice(index,1);
                }else{
                  alert("Some Error Occured, Please Try again");

                }
              }).catch((err)=>{
                this.working=false;
                alert("Some Error Occured, Please Try again");
              });

          },
        },
      ],
    })
    .then((box)=>{box.present();});
  }

  initEdit(localRate: Rate){
    this.rate=localRate;
    this.mode=1;

  }

  initAdd(){
    this.rate=new Rate({});
    this.mode=1;
    console.log(this.rate,this.mode);
  }

}
