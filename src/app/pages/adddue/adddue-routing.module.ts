import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddduePage } from './adddue.page';

const routes: Routes = [
  {
    path: '',
    component: AddduePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddduePageRoutingModule {}
