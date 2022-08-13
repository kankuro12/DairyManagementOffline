import { Component } from '@angular/core';
import { SqlliteService } from '../services/sqllite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private db: SqlliteService) {}
  del(){
    this.db.run('delete from milkdatas where id>0')
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
