import { Center } from 'src/app/database/models/center.modal';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centersync',
  templateUrl: './centersync.component.html',
  styleUrls: ['./centersync.component.scss'],
})
export class CentersyncComponent implements OnInit {
  pulling=1;
  total=1;
  current=0;
  constructor(private api: ApiService) { }

  ngOnInit() {}

  importData(){

    if(confirm('Do you want to fetch center data from server?')){
      this.pulling=2;
      this.current=0;
      this.api.get('centers')
      .subscribe( (res: any)=>{
        this.total=res.centers.length;
        if(this.total>0){
          res.centers.forEach(center => {
            const c=new Center(center);
            c.save();
            this.pulling=3;
            this.current+=1;
            if(this.total===this.current){
              this.pulling=1;
              alert("Data fetched sucessfully");
            }
          });

        }else{
          this.pulling=1;
        }
      },(err)=>{this.pulling=1;alert("Some Error Occured Please Try Again.");});
    }
  }

}
