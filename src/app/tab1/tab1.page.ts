import { Component } from '@angular/core';
import { SqlliteService } from '../services/sqllite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private db: SqlliteService) {}

}
