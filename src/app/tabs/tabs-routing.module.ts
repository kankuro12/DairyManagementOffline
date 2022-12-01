import { CalculatorPageModule } from './../calculator/calculator.module';
import { SellitemPageModule } from './../sellitem/sellitem.module';
import { FarmerReportComponent } from './../report/farmer-report/farmer-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { SnffatComponent } from '../pages/snffat/snffat.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'advance',
        loadChildren: () => import('../advancetab/advancetab.module').then(m => m.AdvancetabPageModule)
      },
      {
        path: 'farmers',
        loadChildren: () => import('../farmers/farmers.module').then(m => m.FarmersModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('../payment/payment.module').then(m => m.PaymentPageModule)
      },
      {
        path: 'sellitem',
        loadChildren: () => import('../sellitem/sellitem.module').then(m => m.SellitemPageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then(m => m.CalculatorPageModule)
      },
      {
        path: 'customerpayment',
        loadChildren: () => import('../customerpayment/customerpayment.module').then(m => m.CustomerpaymentPageModule)
      },
      {
        path: 'customer-collection',
        loadChildren:()=> import('../customer-collection/customer-collection.module').then(m=>m.CustomerCollectionPageModule)
      },
      {
        path: 'report',
        component: FarmerReportComponent
      },
      {
        path: 'snffat',
        component: SnffatComponent
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
