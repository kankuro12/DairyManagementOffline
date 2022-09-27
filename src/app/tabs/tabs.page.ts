import { SettingsService } from 'src/app/services/settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public setting: SettingsService
    ) {

    }

  filter()
  {
    return this.setting.tabs.filter(o=>o.open);
  }

}
