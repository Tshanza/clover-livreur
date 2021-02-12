import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  wasEdited: boolean = false;
  canEdit:boolean = false;

  constructor(private modalCtrl: ModalController,
              public formatService: FormatService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
    console.log('order', this.order)
    this.canEdit = new Date().toDateString() === new Date(this.order.date).toDateString() ? true : false;

  }

  async onClose(){
    const alert = await this.alertCtrl.create({
      subHeader: 'Voulez vous enregistrer les modifications ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.modalCtrl.dismiss();

          }
        },
        {
          text: 'Enregistrer',
          handler: () => {
            this.placeOrder();
            this.modalCtrl.dismiss(true);

          }
        }
      ]
    });

    if(this.wasEdited){
      await alert.present();
      this.wasEdited = false;

    }else {
      this.modalCtrl.dismiss();

    }

  }

  async onUpdatOrder(order: Order){
    const modal = await this.modalCtrl.create({
      component: OrderEditPage,
      componentProps: { order },

    });

    await modal.present();
    
  }

  async onArticle(index: number){
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'qty',
          type: 'number',
          placeholder: 'Quantite'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Valider',
          handler: (qty) => {
            console.log('quantite', qty, index);
            this.order.articles[index].qty = qty.qty;
            this.wasEdited = true;

          }
        },
        
      ]
    });

    if(this.canEdit) await alert.present();
    
  }

  async placeOrder(){

  }

}
