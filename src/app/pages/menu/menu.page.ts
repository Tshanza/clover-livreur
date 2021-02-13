import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
              private authService: AuthService) { 

    this.loadUserInfo();

  }

  ngOnInit() {
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
