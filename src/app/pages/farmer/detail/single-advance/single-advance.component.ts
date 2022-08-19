import { Helper } from './../../../../utli/helper';
import { Advance } from 'src/app/database/models/advance.modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-single-advance',
  templateUrl: './single-advance.component.html',
  styleUrls: ['./single-advance.component.scss'],
})
export class SingleAdvanceComponent implements OnInit {
  @Input() advance: Advance;
  @Output() updated = new EventEmitter<Advance>();
  date='';
  constructor() { }

  ngOnInit() {
    this.date=Helper.dateSTR(this.advance.date);

  }

  initUpdate(){

  }
}
