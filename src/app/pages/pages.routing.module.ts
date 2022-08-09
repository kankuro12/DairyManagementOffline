import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { RatesComponent } from './rates/rates.component';



const routes: Routes = [
  {
    path: 'centers',
    component: CentersComponent
  },
  {
    path: 'rates',
    component: RatesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PagesRoutingModule { }
