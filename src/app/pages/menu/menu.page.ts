import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet, LoadingController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Plugins } from '@capacitor/core';

const { App } = Plugins;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public appPages = [
    { title: 'Acceuil', url: '/menu/home', icon: 'home' },
    { title: 'Livraison', url: '/menu/clients', icon: 'storefront' },
    { title: 'Factures', url: '/menu/historique', icon: 'cart' },
    
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  user: User;

  constructor(private userService: UserService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private platform: Platform,
              private routerOutlet: IonRouterOutlet) { 

    this.loadUserInfo();
    // this.backButtonToExit();
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.confirm();

      }
    });

  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log('view');
    
  }

  async confirm(){
    const alert = await this.alertCtrl.create({
      header: 'Attention !',
      message: 'Voulez vous quitter l\'application ?',
      buttons: [
        {
          text: 'QUITTER',
          handler: () => {
            App.exitApp();

          }
        },
        {
          text: 'ANNULER',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

  }

  async loadUserInfo(){
    const loader = await this.loadingCtrl.create();
    await loader.present();

    this.user = await this.userService.getUserInfos();
    loader.dismiss();
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

  

}
