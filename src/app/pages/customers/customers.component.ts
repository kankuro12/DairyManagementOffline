import { Customer } from './../../database/models/customer.modal';
import { Component, OnInit } from '@angular/core';
import { SqlliteService } from 'src/app/services/sqllite.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  customers: Customer[]=[];
  constructor(private db: SqlliteService) { }

  async ngOnInit() {
    this.customers=await this.db.select(Customer,"select * from customers");
  }

}
