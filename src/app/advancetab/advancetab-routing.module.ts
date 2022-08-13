import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancetabPage } from './advancetab.page';

const routes: Routes = [
  {
    path: '',
    component: AdvancetabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancetabPageRoutingModule {}
