import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesPage } from './articles.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesPage
  },
  {
    path: 'choos-article/:id',
    loadChildren: () => import('./choos-article/choos-article.module').then( m => m.ChoosArticlePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesPageRoutingModule {}
