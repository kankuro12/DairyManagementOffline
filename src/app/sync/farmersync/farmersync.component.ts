import { Farmer } from 'src/app/database/models/farmer.modal';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmersync',
  templateUrl: './farmersync.component.html',
  styleUrls: ['./farmersync.component.scss'],
})
export class FarmersyncComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {}

  importData(){

    if(confirm('Do you want to fetch farmer data from server?')){
      this.api.get('farmers/list')
      .subscribe( (farmers: any[])=>{
        farmers.forEach(farmer => {
          const f=new Farmer(farmer);
          f.save();
        });
      });
    }
  }

}
