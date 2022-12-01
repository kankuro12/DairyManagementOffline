import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerpaymentPage } from './customerpayment.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerpaymentPageRoutingModule {}
