import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  credential = {
    email: '',
    password: ''
  }

  constructor(private router: Router,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {

  }

  async onConnexion(form: NgForm){
    // this.router.navigateByUrl('/home', { replaceUrl: true});
    const loading = await this.loadingCtrl.create();
    await loading.present();

    
    this.authService.signIn(form.value)
      .then(() => {
        this.router.navigateByUrl('/menu', { replaceUrl: true });
        console.log('all things are right !');
        loading.dismiss();

      })
      .catch(error => {
        console.log('something gone wrong !');
        this.logError(error);
        loading.dismiss();

      });
    
  }

  async logError(msg: string){
    const alert = await this.alertCtrl.create({
      header: 'Erreur !',
      message: msg,
      buttons: [{
        text: 'OK',
      }]
    });

    await alert.present();

  }
  

}
