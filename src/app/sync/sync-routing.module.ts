import { CentersyncComponent } from './centersync/centersync.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyncPage } from './sync.page';

const routes: Routes = [
  {
    path: '',
    component: SyncPage,

  },
  {path:'center',component:CentersyncComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncPageRoutingModule {}