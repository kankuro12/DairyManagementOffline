import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerCollectionPageRoutingModule } from './customer-collection-routing.module';

import { CustomerCollectionPage } from './customer-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerCollectionPageRoutingModule
  ],
  declarations: [CustomerCollectionPage]
})
export class CustomerCollectionPageModule {}
