/* eslint-disable eqeqeq */
import { SettingsService } from 'src/app/services/settings.service';
import { Component } from '@angular/core';
import { SqlliteService } from '../services/sqllite.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private db: SqlliteService,
    public auth: AuthService,
    public setting: SettingsService) {}
  del(){
    this.db.run('delete from milkamounts where id>0')
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });
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
