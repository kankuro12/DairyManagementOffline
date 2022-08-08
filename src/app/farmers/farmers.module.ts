import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FarmersPage } from './farmers.page';

import { FarmersPageRoutingModule } from './Farmersrouting.module';
import { FarmerListComponent } from './farmer-list/farmer-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: FarmersPage }]),
    FarmersPageRoutingModule,
  ],
  declarations: [FarmersPage,FarmerListComponent]
})
export class FarmersModule {}
