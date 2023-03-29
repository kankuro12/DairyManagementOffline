import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MilkfatsnfPageRoutingModule } from './milkfatsnf-routing.module';

import { MilkfatsnfPage } from './milkfatsnf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MilkfatsnfPageRoutingModule
  ],
  declarations: [MilkfatsnfPage]
})
export class MilkfatsnfPageModule {}
