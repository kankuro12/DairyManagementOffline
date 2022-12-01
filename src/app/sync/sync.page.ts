import { SettingsService } from 'src/app/services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  constructor(public setting: SettingsService) { }

  ngOnInit() {
  }

}
