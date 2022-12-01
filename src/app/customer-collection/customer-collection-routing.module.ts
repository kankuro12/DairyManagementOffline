import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerCollectionPage } from './customer-collection.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerCollectionPageRoutingModule {}
