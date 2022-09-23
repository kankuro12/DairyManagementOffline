import { FarmersyncComponent } from './farmersync/farmersync.component';
import { CentersyncComponent } from './centersync/centersync.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyncPage } from './sync.page';
import { CustomersyncComponent } from './customersync/customersync.component';

const routes: Routes = [
  {
    path: '',
    component: SyncPage,

  },
  {path:'farmer',component:FarmersyncComponent},
  {path:'center',component:CentersyncComponent},
  {path:'customer',component:CustomersyncComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncPageRoutingModule {}
