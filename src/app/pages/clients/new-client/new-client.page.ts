import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {

  constructor(private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private clientService: ClientService) { }

  ngOnInit() {

  }

  async onClose(){
    const toast = await this.toastCtrl.create({
    message: 'creation interropue !',
    duration: 2500,
    });

    this.modalCtrl.dismiss();
    await toast.present();

  }

  async onCreateClient(form: NgForm){
    const loader = await this.loadingCtrl.create();

    const toast = await this.toastCtrl.create({
    message: 'client cree avec succes !',
    duration: 2500,
    });

    const error = await this.toastCtrl.create({
      message: 'Une erreure s est produite, essayer plutard !',
      duration: 3000,

    });

    await loader.present();


    const client = {...form.value, code: ""};

    const status = await this.clientService.createClient(client);
    loader.dismiss();

    if(status){
      await toast.present();
      this.modalCtrl.dismiss(true);
    }else {
      await error.present();
      
    }
    

  }

}
