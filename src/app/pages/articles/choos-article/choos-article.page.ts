import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Client } from 'src/app/models/client.model';
import { Image } from 'src/app/models/image.model';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { OrderPage } from '../../my-orders/order/order.page';
import { ArticlesPage } from '../articles.page';

@Component({
  selector: 'app-choos-article',
  templateUrl: './choos-article.page.html',
  styleUrls: ['./choos-article.page.scss'],
})
export class ChoosArticlePage implements OnInit {

  searchBar:boolean = false;
  dataSource: MatTableDataSource<Article> = new MatTableDataSource([]);
  categories: string[] = [];
  orderList: Article[] = [];

  constructor(private articleService: ArticleService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private route: ActivatedRoute,
              private clientService: ClientService) { }

  async ngOnInit() {
    this.loadArticle();
    console.log('list', this.orderList);

  }

  toggleSearchBar(){
    this.searchBar = !this.searchBar;

  }

  async onGetClient(): Promise<Client>{
    const id = this.route.snapshot.params['id'];
    console.log('id', id);
    const res = await this.clientService.getClient(id);
    console.log('client', res);
    return res;
    
  }

  async loadArticle(){

    if(this.dataSource.data.length) return;

    const loader = await this.loadingCtrl.create();
    await loader.present();

    const data = await this.articleService.getAricles();
    console.log('data', data);
    this.dataSource = new MatTableDataSource(data);
    this.getCategory();
    loader.dismiss();

  }

  async applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filer value', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  getCategory(){
    const data = this.dataSource.filteredData;
    const tmp = [];

    data.forEach(item => {
      if(!tmp.includes(item.category)){
        tmp.push(item.category);

      }

    })
    console.log('categories', tmp);
    this.categories = tmp;
  }

  async onSelectArticle(article: Article){
    
    const index = this.orderList.findIndex(item => item.code === article.code);

    if(index > -1){
      this.orderList.splice(index, 1);
      return;

    }

    this.orderList.push(article);

  }

  async onValider(){
    const loader = await this.loadingCtrl.create();
    await loader.present();

    const articles: Article[] = this.orderList;
    const client: Client = await this.onGetClient();
    await loader.dismiss();

    const modal = await this.modalCtrl.create({
      component: OrderPage,
      componentProps: { articles, client },

    });

    await modal.present();
    
  }

}
