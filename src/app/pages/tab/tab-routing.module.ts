import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tab/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'recent',
        loadChildren: () => import('../my-orders/my-orders.module').then(m => m.MyOrdersPageModule),
      },
      {
        path: 'client',
        loadChildren: () => import('../clients/clients.module').then(m => m.ClientsPageModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
