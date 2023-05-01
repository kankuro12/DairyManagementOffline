/* eslint-disable eqeqeq */
import { SettingsService } from 'src/app/services/settings.service';
import { Component } from '@angular/core';
import { SqlliteService } from '../services/sqllite.service';
import { AuthService } from '../services/auth.service';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private backButtonSubscription: Subscription;

  constructor(
    private db: SqlliteService,
    public auth: AuthService,
    public router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    public setting: SettingsService) {

    }
  del(){
    this.db.run('delete from milkamounts where id>0')
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  ionViewDidEnter() {
    this.backButtonSubscription=this.platform.backButton.subscribeWithPriority(10, (next) => {
        console.log(this.router.url);
        if(this.router.url=="/tabs/tab1"){
          if(confirm("Logout From Application")){
            this.router.navigate(['/login'],{replaceUrl:true});
          }
        }else{
          next();
        }
      }
    );
  }

  ionViewDidLeave() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  activeParts(datas){
    const filtered=[];
    datas.filter(o=>o.active).forEach(data => {
      if(data.needlogin ){
          if(this.auth.loginMode==1){
            filtered.push(data);
          }
      }else{
        filtered.push(data);
      }
    });
    return filtered;
  }
}
