import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddduePageRoutingModule } from './adddue-routing.module';

import { AddduePage } from './adddue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddduePageRoutingModule
  ],
  declarations: [AddduePage]
})
export class AddduePageModule {}
