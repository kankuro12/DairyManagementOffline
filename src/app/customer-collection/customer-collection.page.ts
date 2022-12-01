import { ApiService } from './../services/api.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-collection',
  templateUrl: './customer-collection.page.html',
  styleUrls: ['./customer-collection.page.scss'],
})
export class CustomerCollectionPage implements OnInit {

  constructor(private auth: AuthService,private api: ApiService) { }

  ngOnInit() {
  }

}
