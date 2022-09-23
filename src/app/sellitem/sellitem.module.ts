import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellitemPageRoutingModule } from './sellitem-routing.module';

import { SellitemPage } from './sellitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellitemPageRoutingModule
  ],
  declarations: [SellitemPage]
})
export class SellitemPageModule {}
