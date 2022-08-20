import { ReportindexComponent } from './reportindex/reportindex.component';
import { FarmerReportComponent } from './farmer-report/farmer-report.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path:'',
    component:ReportindexComponent
  },
  {
    path:"farmer",
    component:FarmerReportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ReportrouteModule { }
