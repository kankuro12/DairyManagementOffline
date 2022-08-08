import { Farmer } from './../database/models/farmer.modal';
import { Component, OnInit } from '@angular/core';
import { SqlliteService } from '../services/sqllite.service';

@Component({
  selector: 'app-farmers',
  templateUrl: 'farmers.page.html',
  styleUrls: ['farmers.page.scss']
})
export class FarmersPage implements OnInit {
  farmerList=[];

  constructor(private db: SqlliteService) {}
  ngOnInit(): void {
    this.db.select(Farmer,"select * from farmers",[])
    .then((list)=>{
      console.log(list);

      this.farmerList=list;
    })
    .catch((err)=>{
      console.error(err);

    });
  }



}
