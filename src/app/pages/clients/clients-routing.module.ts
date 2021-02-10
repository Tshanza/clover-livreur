import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsPage } from './clients.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage
  },
  // {
  //   path: 'client-detail',
  //   loadChildren: () => import('./client-detail/client-detail.module').then( m => m.ClientDetailPageModule)
  // },
  // {
  //   path: 'new-client',
  //   loadChildren: () => import('./new-client/new-client.module').then( m => m.NewClientPageModule)
  // },
  // {
  //   path: 'update-client',
  //   loadChildren: () => import('./update-client/update-client.module').then( m => m.UpdateClientPageModule)
  // },
  // {
  //   path: 'client-list',
  //   loadChildren: () => import('./client-list/client-list.module').then( m => m.ClientListPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsPageRoutingModule {}
