import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Edition, Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormatService } from 'src/app/services/format.service';
import { OrderService } from 'src/app/services/order.service';
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
              public alertCtrl: AlertController,
              public orderService: OrderService,
              public authService: AuthService,
              public toastCtrl: ToastController) { }

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
            this.order.articles[index].qty = qty.qty * 1;
            this.order.articles[index].total = qty.qty * this.order.articles[index].price;

            this.order.total = this.order.articles.map(article => article.total).reduce((t, i) => t + i, 0);

            this.wasEdited = true;

          }
        },
        
      ]
    });

    if(this.canEdit) await alert.present();
    
  }

  async placeOrder(){
    const success = await this.toastCtrl.create({
      message: 'facture modifier...',
      duration: 2000,

    });

    const fail = await this.toastCtrl.create({
      message: 'Echec de modification de la facture...',
      duration: 2000,

    });

    const empty = this.order.articles.filter(article => article.qty > 0);

    const user = this.authService.userId;
    const edit: Edition = {lastOrderId: this.order._id, name: user?.name, times: this.order.edition.times + 1, active: true};
    const order: Order = {...this.order, edition: edit, articles: empty, date: Date.now()};

    const isCanceled = await this.orderService.cancelOrder(this.order);
    if(!isCanceled) return await fail.present();// on desactive la facture avant d'en creer une correction
    if(!empty.length) return await success.present(); // au cas ou il n y a pas de produit vendue

    const isDone = await this.orderService.createOrder(order);
    if(isDone) return await success.present();
    
    return await fail.present();

  }

  // async onValider(){
  //   const loader = await this.loadingCtrl.create();
  //   await loader.present();
   
  //   let total = 0;
  //   this.articles.forEach(item => {
  //     total+= item.total;

  //   })

  //   const editInit: Edition = {
  //     lastOrderId: '',
  //     name: '',
  //     times: 0
  //   };

  //   const order = new Order('',this.user, this.client, this.articles, Date.now(),this.changeRate,Date.now().toString(),"CASH",editInit, total);
  //   console.log('order', order);
    
  //   const isDone = await this.orderService.createOrder(order);
  //   await loader.dismiss();

  //   if(isDone){
  //     this.modalCtrl.dismiss();
  //     this.router.navigateByUrl('/tab/home', { replaceUrl: true});
      
  //   }else {
  //     console.log('try again !');

  //   }

  //   // const modal = await this.modalCtrl.create({
  //   //   component: ConfirmPage,
  //   //   componentProps: { order }

  //   // });

  //   // await modal.present();

  //   // this.router.navigateByUrl('/confirm', { replaceUrl: true });
    
  // }

}
