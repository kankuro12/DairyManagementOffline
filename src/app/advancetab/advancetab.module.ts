import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvancetabPageRoutingModule } from './advancetab-routing.module';

import { AdvancetabPage } from './advancetab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancetabPageRoutingModule
  ],
  declarations: [AdvancetabPage]
})
export class AdvancetabPageModule {}
