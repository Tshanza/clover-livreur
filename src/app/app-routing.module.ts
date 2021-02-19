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
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'article/:id',
    loadChildren: () => import('./pages/articles/choos-article/choos-article.module').then(m => m.ChoosArticlePageModule)
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
