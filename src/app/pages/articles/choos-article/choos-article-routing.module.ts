import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoosArticlePage } from './choos-article.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoosArticlePageRoutingModule {}
