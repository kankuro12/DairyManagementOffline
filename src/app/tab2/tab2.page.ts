import { Farmer } from './../database/models/farmer.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Center } from './../database/models/center.modal';
import { SqlliteService } from './../services/sqllite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  center: Center;
  centers: Center[];
  farmers: Farmer[];
  date: string;

  constructor(private db: SqlliteService) {
    const d4 = new NepaliDate(new Date('2017-01-15')); 

  }
  async ngOnInit() {
    this.centers=await this.db.select(Center,"select id,name from centers",[]);
    if(this.centers.length===1){
      this.center=this.centers[0];
    }

  }




}
