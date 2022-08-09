import { SqlliteService } from './../../services/sqllite.service';
import { Center } from './../../database/models/center.modal';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss'],
})
export class CentersComponent implements OnInit {
  centers: Center[];
  mode=0;
  center: Center;
  working=false;
  constructor(private db: SqlliteService,private alert: AlertController) { }

  async ngOnInit() {
    this.centers=await this.db.select(Center,"select * from centers",[]);
  }



  save(){
    console.log(this.center);
    if(this.center.name===(undefined) || this.center.name===null){
      alert("Please Enter name");
      return;
    }
    this.working=true;
    this.center.save()
    .then((localCenter: Center)=>{
      console.log(localCenter);

      const index = this.centers.findIndex((obj => obj.id === localCenter.id));
      if(index>=0){
        this.centers[index]=localCenter;
      }else{
        this.centers.push(localCenter);
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

  initDelete(center: Center){
    this.working=true;
    this.alert.create({
      message:"Do you want to delete center?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
              center.del()
              .then((result: any)=>{
                this.working=false;
                if(result.status){
                  alert("Center Deleted Sucessfully");
                  const index = this.centers.findIndex((obj => obj.id === center.id));
                  this.centers.splice(index,1);
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

  initEdit(localCenter: Center){
    this.center=localCenter;
    this.mode=1;

  }

  initAdd(){
    this.center=new Center({});
    this.mode=1;
    console.log(this.center,this.mode);
  }

}
