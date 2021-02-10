import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateClientPage } from './update-client.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateClientPageRoutingModule {}
