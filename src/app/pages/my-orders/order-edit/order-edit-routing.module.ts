import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderEditPage } from './order-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OrderEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderEditPageRoutingModule {}
