import { CustomerSearchService } from './../../services/customer-search.service';
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { ApiService } from './../../services/api.service';
/* eslint-disable eqeqeq */
import { Customer } from './../../database/models/customer.modal';
import { Component, OnInit } from '@angular/core';
import { SqlliteService } from 'src/app/services/sqllite.service';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(private db: SqlliteService,private api: ApiService,public search: CustomerSearchService) { }

  async ngOnInit() {

  }







}
