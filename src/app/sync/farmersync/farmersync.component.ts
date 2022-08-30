/* eslint-disable @typescript-eslint/prefer-for-of */
import { Farmer } from 'src/app/database/models/farmer.modal';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmersync',
  templateUrl: './farmersync.component.html',
  styleUrls: ['./farmersync.component.scss'],
})
export class FarmersyncComponent implements OnInit {
  pulling = 1;
  total = 0;
  current = 0;
  progress = 0;
  constructor(private api: ApiService) { }

  ngOnInit() { }

  async importData() {
    this.pulling = 2;
    if (confirm('Do you want to fetch farmer data from server?')) {
      this.api.get('farmers/list')
        .subscribe(async (farmers: any[]) => {
          this.pulling = 3;
          this.total = farmers.length;
          this.current = 0;
          if (this.total > 0) {
            for (let index = 0; index < farmers.length; index++) {
              const farmer = farmers[index];
              const f = new Farmer(farmer);
              await f.save();
              console.log('index',index);
              if ((index+1) === this.total) {
                this.pulling = 1;
                alert('Data fetched sucessfully');
              }
            }
          } else {
            this.pulling = 1;
          }
        }, (err) => { this.pulling = 1; alert("Some Error Occured Please Try Again."); });
    }
  }

}
