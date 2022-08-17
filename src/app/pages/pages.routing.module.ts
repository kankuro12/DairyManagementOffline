import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { RatesComponent } from './rates/rates.component';
import { DetailPage } from './farmer/detail/detail.page';



const routes: Routes = [
  {
    path: 'centers',
    component: CentersComponent
  },
  {
    path: 'rates',
    component: RatesComponent
  },
  {
    path: 'farmer-detail/:id',
    component: DetailPage
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PagesRoutingModule { }
