import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilkfatsnfPage } from './milkfatsnf.page';

const routes: Routes = [
  {
    path: '',
    component: MilkfatsnfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilkfatsnfPageRoutingModule {}
