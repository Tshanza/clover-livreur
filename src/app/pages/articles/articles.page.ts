import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  @Input() articles: Article[];
  @Input() client: Client;
  changeRate: number = 1;

  field;
  user: User;

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private userService: UserService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.onGetUser();
    console.log('client', this.client);

  }

  ngAfterViewInit(){
    console.log('view child after init', this.input);
    this.field = this.input.nativeElement;
    
  }

  ionViewDidLeave(){
    console.log('view did leave');
    this.articles.forEach(article => {
      article.qty = 0;
      article.total = 0;
      
    })
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
    const list: Article[] = this.articles.filter(article => article.qty != 0);
    // const total = list.reduce((accumulator, currentValue) => accumulator + currentValue)
    let total = 0;
    list.forEach(item => {
      total+= item.total;

    })
    const order: Order = new Order('',this.user, this.client, this.articles, Date.now(),this.changeRate,Date.now().toString(),"CASH", total,);


    const isDone = await this.orderService.createOrder(order);

    if(isDone){
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/tab', { replaceUrl: true});
      
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
