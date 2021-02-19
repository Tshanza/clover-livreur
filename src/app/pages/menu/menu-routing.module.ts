import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'clients',
        loadChildren: () => import('../clients/client-list/client-list.module').then(m => m.ClientListPageModule),
      },
      {
        path: 'home',
        loadChildren: () => import ('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'historique',
        loadChildren: () => import('../my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
