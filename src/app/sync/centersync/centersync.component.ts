import { Center } from 'src/app/database/models/center.modal';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centersync',
  templateUrl: './centersync.component.html',
  styleUrls: ['./centersync.component.scss'],
})
export class CentersyncComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {}

  importData(){

    if(confirm('Do you want to fetch center data from server?')){
      this.api.get('centers')
      .subscribe( (res: any)=>{
        res.centers.forEach(center => {
          const c=new Center(center);
          c.save();
        });
      });
    }
  }

}
