import { Helper } from './../../utli/helper';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import  NepaliDate  from 'nepali-date';

@Component({
  selector: 'app-session-chooser',
  templateUrl: './session-chooser.component.html',
  styleUrls: ['./session-chooser.component.scss'],
})
export class SessionChooserComponent implements OnInit {
  @Output() done= new EventEmitter<any>();
  year: number;
  month: number;
  session: number;
  years: number[]=[];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  sessions: number[] = [1, 2];
  initiated = false;
  constructor() {
    for (let index = 2075; index <= 2090; index++) {
      this.years.push(index);
    }
    const nepaliDate=new NepaliDate(new Date());
    this.year=nepaliDate.getYear();
    this.month=parseInt(nepaliDate.getMonth(),10)+1;
    if(nepaliDate.getDate()>15){
      this.session=2;
    }else{
      this.session=1;
    }
    this.initiated = true;
  }

  ngOnInit() { }
  loadData() {
    this.done.emit({
      range:Helper.getSessionRange(this.year,this.month,this.session),
      curSession:Helper.makeIntegerSession(this.year,this.month,this.session),
      year:this.year,
      month:this.month,
      session:this.session
    });
  }

}
