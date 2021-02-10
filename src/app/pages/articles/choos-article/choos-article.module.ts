import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosArticlePageRoutingModule } from './choos-article-routing.module';

import { ChoosArticlePage } from './choos-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosArticlePageRoutingModule
  ],
  declarations: [ChoosArticlePage]
})
export class ChoosArticlePageModule {}
