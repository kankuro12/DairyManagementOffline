import { FarmersyncComponent } from './farmersync/farmersync.component';
import { MilkdatasyncComponent } from './milkdatasync/milkdatasync.component';
import { CentersyncComponent } from './centersync/centersync.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyncPageRoutingModule } from './sync-routing.module';

import { SyncPage } from './sync.page';
import { CustomersyncComponent } from './customersync/customersync.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyncPageRoutingModule
  ],
  declarations: [SyncPage,CentersyncComponent,MilkdatasyncComponent,FarmersyncComponent,CustomersyncComponent]
})
export class SyncPageModule {}
