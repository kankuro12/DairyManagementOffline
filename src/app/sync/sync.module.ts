import { FarmersyncComponent } from './farmersync/farmersync.component';
import { MilkdatasyncComponent } from './milkdatasync/milkdatasync.component';
import { CentersyncComponent } from './centersync/centersync.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyncPageRoutingModule } from './sync-routing.module';

import { SyncPage } from './sync.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyncPageRoutingModule
  ],
  declarations: [SyncPage,CentersyncComponent,MilkdatasyncComponent,FarmersyncComponent]
})
export class SyncPageModule {}
