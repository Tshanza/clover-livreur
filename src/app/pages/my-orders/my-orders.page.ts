import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingController, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { FormatService } from 'src/app/services/format.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailPage } from './order-detail/order-detail.page';
import { OrderEditPage } from './order-edit/order-edit.page';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  data: Order[] = [];
  dataFilter: Order[] = [];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.data);
  showSearchBar:boolean = false;
  canFilter: boolean = false;
  
  
  constructor(private orderService: OrderService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              public formatService: FormatService) { }

  async ngOnInit() {
    this.loadClients();
    // this.changeRate = await this.orderService.getChangeRate();

  }

  ionViewDidEnter(){
    console.log('view did enter !');

  }

  async onRefresh(event: Event){
    const data = await this.orderService.getOrders();
    this.dataFilter = data;
    this.data = data;
    this.dataSource = new MatTableDataSource(data);

    (event.target as HTMLIonRefresherElement).complete();

  }

  async loadClients(){
    const loader = await this.loadingCtrl.create();
    // await loader.present();

    this.data = await this.orderService.getOrders();
    this.dataFilter = this.data;
    // this.dataSource = new MatTableDataSource(data);
    // loader.dismiss();

  }

  async applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    const value = filterValue.trim().toLowerCase();
    this.dataFilter = this.data.filter(order => order.client.code.includes(value));

    const ev = (event.target as HTMLInputElement)
    console.log('see event', ev);

  }

  async cancelFilter(event: Event){
    console.log('cancel filter');
    const value = '';
    this.dataFilter = this.data.filter(order => order.client.code.includes(value));

  }

  async onDetail(order: Order){
    const modal = await this.modalCtrl.create({
      component: OrderDetailPage,
      componentProps: { order },

    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      if(res.data) this.loadClients();

    })

  }

  async onCancel(order: Order){
    console.log('cancel this order', order);


  }

  async onEdit(order: Order){
    const modal = await this.modalCtrl.create({
      component: OrderEditPage,
      componentProps: { order },

    });

    await modal.present();
    modal.onDidDismiss().then(res => { if(res.data) this.loadClients() });

  }

  toggleSearchBar(){
    this.showSearchBar = !this.showSearchBar;

  }

  async onGetDate(event: Event){
    
    const date = (event.target as HTMLIonDatetimeElement).value;
    const d = new Date(date).toDateString();

    console.log('date', d);
    
    this.dataFilter = this.data.filter(order => {
      const tmp = new Date(order.date).toDateString();
      return d <= tmp;
    });

  }

  toggleDateFilter(){
    this.dataFilter = this.data;
    this.canFilter = !this.canFilter;

  }
}
