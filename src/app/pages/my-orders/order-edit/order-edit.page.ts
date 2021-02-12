import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.page.html',
  styleUrls: ['./order-edit.page.scss'],
})
export class OrderEditPage implements OnInit {

  searchBar:boolean = false;
  dataSource: MatTableDataSource<Article> = new MatTableDataSource([]);
  categories: string[] = [];
  orderList: Article[] = [];

  @Input() order: Order;

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
    this.dataSource.filter = "";

  }

  onclose(){
    this.modalCtrl.dismiss();
    
  }


  async loadArticle(){

    if(this.dataSource.data.length) return;

    const loader = await this.loadingCtrl.create();
    // await loader.present();

    const data = await this.articleService.getAricles();
    console.log('data', data);
    this.dataSource = new MatTableDataSource(data);
    this.getCategory();
    // loader.dismiss();

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

    this.orderList.forEach(article => {
      this.order.articles.find(art => art.code === article.code) ? "" : this.order.articles.push(article);

    })

    await loader.dismiss();
    this.modalCtrl.dismiss();

  }

}
