import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellitemPage } from './sellitem.page';

const routes: Routes = [
  {
    path: '',
    component: SellitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellitemPageRoutingModule {}
