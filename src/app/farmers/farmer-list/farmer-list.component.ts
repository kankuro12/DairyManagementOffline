import { Farmer } from './../../database/models/farmer.modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.scss'],
})
export class FarmerListComponent implements OnInit {
  @Input() farmers: Farmer[];
  constructor() { }

  ngOnInit() {}

}
