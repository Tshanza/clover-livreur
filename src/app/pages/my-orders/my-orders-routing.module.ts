import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersPage } from './my-orders.page';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersPage
  },
  // {
  //   path: 'order-edit',
  //   loadChildren: () => import('./order-edit/order-edit.module').then( m => m.OrderEditPageModule)
  // },
  // {
  //   path: 'order-detail',
  //   loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  // },
  // {
  //   path: 'order',
  //   loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersPageRoutingModule {}
