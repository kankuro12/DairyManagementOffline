import { RatesComponent } from './rates/rates.component';
import { CentersComponent } from './centers/centers.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages.routing.module';


@NgModule({
  declarations: [CentersComponent,RatesComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
