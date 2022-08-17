import { SingleMilkComponentComponent } from './farmer/detail/single-milk-component/single-milk-component.component';
import { DetailPage } from './farmer/detail/detail.page';
import { RatesComponent } from './rates/rates.component';
import { CentersComponent } from './centers/centers.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages.routing.module';


@NgModule({
  declarations: [CentersComponent,RatesComponent,DetailPage,SingleMilkComponentComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
