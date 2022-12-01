import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerpaymentPageRoutingModule } from './customerpayment-routing.module';

import { CustomerpaymentPage } from './customerpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerpaymentPageRoutingModule
  ],
  declarations: [CustomerpaymentPage]
})
export class CustomerpaymentPageModule {}
