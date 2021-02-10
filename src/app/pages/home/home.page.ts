import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnalyseService } from 'src/app/services/analyse.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  saleByZone: {zone: string, sale: number}[] = [];
  saleByProduct: {id: string, name: string, detail: string, sale: number}[] = [];
  totalSale: any[] = [];

  constructor(private alertCtrl: AlertController,
              private authService: AuthService,
              private auth: AngularFireAuth,
              private router: Router,
              private analyseService: AnalyseService) { }

  ngOnInit() {
    this.loadSBP();
    this.loadSBZ();
    
  }

  async onRefresh(event: Event){
    this.loadSBP();
    this.loadSBZ();

    (event.target as HTMLIonRefresherElement).complete();

  }

  onGetDate(event: Event){
    const date = (event.target as HTMLIonDatetimeElement).value;

    console.log('date', date);
    console.log('date 2', new Date(date).toDateString());
  }

  async loadSBZ(){
    this.saleByZone = await this.analyseService.salesByZone();

  }

  async loadSBP(){
    this.saleByProduct = await this.analyseService.salesByProduct();
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
              console.log('test auth state', res);

            })
            this.auth.onAuthStateChanged(user => {
              if(user){
                console.log('always loged in !');
                
              }

              console.log('on auth stat', user);

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
