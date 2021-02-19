import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { AnalyseService } from 'src/app/services/analyse.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  saleByZone: {zone: string, sale: number, client: number}[] = [];
  saleByProduct: {name: string, sale: number}[] = [];
  totalSale: {client: number, article: number, montant: number};
  orders: Order[] = [];
  value: string = '';

  constructor(private alertCtrl: AlertController,
              private authService: AuthService,
              private auth: AngularFireAuth,
              private router: Router,
              private analyseService: AnalyseService,
              private orderService: OrderService) { }

  async ngOnInit() {
    this.loadOrders();
    
  }

  ionViewDidEnter(){
    //console.log('ion view did enter !');
    this.loadOrders();
    
  }

  ionViewDidLeave(){
    //console.log('ion view did leave !');

  }

  async onRefresh(event: Event){
    this.loadOrders();

    (event.target as HTMLIonRefresherElement).complete();
    this.value = '';

  }

  async loadOrders(){
    this.orders = await this.orderService.getOrders();
    this.orders = this.orders.filter(order => order.edition.active);

    this.loadSBP();
    this.loadSBZ();
    this.totalSales();

  }

  async onGetDate(event: Event){
    
    const date = (event.target as HTMLIonDatetimeElement).value;
    const d = new Date(date).toDateString();

    //console.log('date', d);
    
    const filteredData = this.orders.filter(order => {
      const tmp = new Date(order.date).toDateString();
      return d == tmp;
    });

    //console.log('filter', filteredData);
    //update display
    this.totalSale = await this.analyseService.totalSales(filteredData);
    this.saleByZone = await this.analyseService.salesByZone(filteredData);
    this.saleByProduct = await this.analyseService.salesByProduct(filteredData);

    

  }

  async totalSales(){
    this.totalSale = await this.analyseService.totalSales(this.orders);

  }

  async loadSBZ(){
    this.saleByZone = await this.analyseService.salesByZone(this.orders);

  }

  async loadSBP(){
    this.saleByProduct = await this.analyseService.salesByProduct(this.orders);
  }

  async onSignOut(){
    const alert = await this.alertCtrl.create({
      header: 'Attention !',
      subHeader: 'Vous etes sur le point de vous deconnecter de l\'application',
      buttons: [
        {
          text: 'Se Deconnecter',
          handler: () => {
            this.authService.signOut();
            this.auth.authState.subscribe(res => {
              //console.log('test auth state', res);

            })
            this.auth.onAuthStateChanged(user => {
              if(user){
                //console.log('always loged in !');
                
              }

              //console.log('on auth stat', user);

            })
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    
  }

  async onStart(){
    this.router.navigateByUrl('/client')
  }

}
