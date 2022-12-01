import { SqlliteService } from 'src/app/services/sqllite.service';
import { AuthService } from './../../services/auth.service';
import { Customer } from './../../database/models/customer.modal';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customersync',
  templateUrl: './customersync.component.html',
  styleUrls: ['./customersync.component.scss'],
})
export class CustomersyncComponent implements OnInit {
  pulling = 1;
  total = 0;
  current = 0;
  progress = 0;
  constructor(private api: ApiService,private auth: AuthService) { }

  ngOnInit() {}
  async importData() {
    this.pulling = 2;
    if (confirm('Do you want to fetch customer data from server?')) {
      this.api.get('customer-list')
        .subscribe(async (customers: any[]) => {
          this.pulling = 3;
          this.total = customers.length;
          this.current = 0;
          if (this.total > 0) {
            for (let index = 0; index < customers.length; index++) {
              const customer = customers[index];
              const f = new Customer(customer);
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
    }else{
      this.pulling = 1;
    }
  }

}
