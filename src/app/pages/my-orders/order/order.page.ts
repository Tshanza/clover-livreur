import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Edition } from 'src/app/models/order.model'

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  @Input() articles: Article[];
  @Input() client: Client;

  dataValide: boolean = false;
  user: User;
  changeRate: number = 1;

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private userService: UserService,
              private orderService: OrderService,
              private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.onGetUser();
    console.log('client', this.client);
    console.log('articles', this.articles)
    this.changeRate = await this.orderService.getChangeRate(this.user.depot);

  }

  ngAfterViewInit(){
    this.articles.forEach(article => {
      article.qty = 0;
      article.total = 0;
      
    })
    
  }

  ionViewDidLeave(){
    
  }

  async onEvent(event: Event){
    const value = (event.target as HTMLIonInputElement).value;
    console.log('value by input', value);

    const res = this.articles.findIndex(article => article.qty === 0);
    if(res == -1) this.dataValide = true;
    if(res > -1) this.dataValide = false;

  }

  async onClose(){
    this.modalCtrl.dismiss();

  }

  onFocusChange(){
    console.log('focus changed !');
    console.log('view child', this.input);
  }

  async onGetUser(){
    this.user = await this.userService.getUserInfos();
    console.log('user Info', this.user);

  }

  onStepUp(index: number){
    this.articles[index].qty++;
    this.articles[index].total = this.articles[index].price * this.articles[index].qty;

  }

  onStepDown(index: number){
    this.articles[index].qty--;
    this.articles[index].total = this.articles[index].price * this.articles[index].qty;

  }

  async onValider(){
    const loader = await this.loadingCtrl.create();
    await loader.present();
   
    let total = 0;
    this.articles.forEach(item => {
      total+= item.total;

    })

    const editInit: Edition = {
      lastOrderId: '',
      name: '',
      times: 0,
      active: true
    };

    const order = new Order('',this.user, this.client, this.articles, Date.now(),this.changeRate,Date.now().toString(),"CASH",editInit, total);
    console.log('order', order);
    
    const isDone = await this.orderService.createOrder(order);
    await loader.dismiss();

    if(isDone){
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/menu/home', { replaceUrl: true});
      
    }else {
      console.log('try again !');

    }

    // const modal = await this.modalCtrl.create({
    //   component: ConfirmPage,
    //   componentProps: { order }

    // });

    // await modal.present();

    // this.router.navigateByUrl('/confirm', { replaceUrl: true });
    
  }

}
