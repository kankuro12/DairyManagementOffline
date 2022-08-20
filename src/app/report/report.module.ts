import { SessionChooserComponent } from './session-chooser/session-chooser.component';
import { FarmerReportComponent } from './farmer-report/farmer-report.component';
import { ReportrouteModule } from './reportroute.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportindexComponent } from './reportindex/reportindex.component';



@NgModule({
  declarations: [
    FarmerReportComponent,
    ReportindexComponent,
    SessionChooserComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReportrouteModule
  ]
})
export class ReportModule { }
