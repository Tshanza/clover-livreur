import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { FormatService } from 'src/app/services/format.service';
import { OrderEditPage } from '../order-edit/order-edit.page';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  @Input() order: Order;

  constructor(private modalCtrl: ModalController,
              public formatService: FormatService) { }

  ngOnInit() {
    console.log('order', this.order)
  }

  onClose(){
    this.modalCtrl.dismiss();

  }

  async onUpdatOrder(order: Order){
    const modal = await this.modalCtrl.create({
      component: OrderEditPage,
      componentProps: { order },

    });

    await modal.present();
    
  }

}
