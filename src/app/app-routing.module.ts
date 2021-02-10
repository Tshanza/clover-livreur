import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoSignGuard } from './guards/auto-sign.guard';
import { ClientListPage } from './pages/clients/client-list/client-list.page';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule),
    canLoad: [ AutoSignGuard ]
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    loadChildren: () => import('./pages/tab/tab.module').then( m => m.TabPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'client',
    component: ClientListPage,
    // loadChildren: () => import('./pages/clients/client-list/client-list.module').then( m => m.ClientListPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'article',
    loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesPageModule),
    canLoad: [AuthGuard]
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
