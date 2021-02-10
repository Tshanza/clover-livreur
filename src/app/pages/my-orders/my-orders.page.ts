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
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.data);
  showSearchBar:boolean = false;
  
  constructor(private orderService: OrderService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              public formatService: FormatService) { }

  ngOnInit() {
    this.loadClients();

  }

  ionViewDidEnter(){
    console.log('view did enter !');

  }

  async onRefresh(event: Event){
    const data = await this.orderService.getOrders();
    this.dataSource = new MatTableDataSource(data);

    (event.target as HTMLIonRefresherElement).complete();

  }

  async loadClients(){
    const loader = await this.loadingCtrl.create();
    await loader.present();

    const data = await this.orderService.getOrders();
    this.dataSource = new MatTableDataSource(data);
    loader.dismiss();

  }

  async applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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

}
