import { AuthgaurdGuard } from './services/authgaurd.guard';
import { LoginComponent } from './authpages/login/login.component';
import { PagesRoutingModule } from './pages/pages.routing.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    canActivate:[AuthgaurdGuard],
    children:[
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'advancetab',
        loadChildren: () => import('./advancetab/advancetab.module').then( m => m.AdvancetabPageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
      },
      {
        path: 'sync',
        loadChildren: () => import('./sync/sync.module').then( m => m.SyncPageModule)
      },
    ]
  },
  {
    path:'login',
    component:LoginComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
