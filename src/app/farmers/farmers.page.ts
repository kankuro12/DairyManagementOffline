/* eslint-disable eqeqeq */
import { Helper } from './../utli/helper';
import { Center } from './../database/models/center.modal';
/* eslint-disable @typescript-eslint/naming-convention */
import { Farmer } from './../database/models/farmer.modal';
import { Component, OnInit } from '@angular/core';
import { SqlliteService } from '../services/sqllite.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-farmers',
  templateUrl: 'farmers.page.html',
  styleUrls: ['farmers.page.scss']
})
export class FarmersPage implements OnInit {
  farmerList: Farmer[]=[];
  filterdList: Farmer[]=[];
  centers: Center[]=[];
  center_id: number;

  constructor(private db: SqlliteService,private auth: AuthService) {}
  ngOnInit() {
    this.loadData();
  }


  async loadData(){
    const apiPer="("+this.auth.user.apiper.join(',')+")";

    this.centers = await this.db.select(Center, `select id,name from centers where id in ${apiPer}`, []);
    this.farmerList=await this.db.select(Farmer,"select * from farmers",[]);
    if(this.centers.length>0){
      this.center_id=this.centers[0].id;
      this.filterdList=this.farmerList.filter(o=>o.center_id==this.center_id);
    }
  }

  filterData(){
    this.filterdList=this.farmerList.filter(o=>o.center_id==this.center_id);
  }

  centerChanged(e){
    this.filterData();
  }

}
