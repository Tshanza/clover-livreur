import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { NewClientPage } from '../new-client/new-client.page';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {

  searchBar: boolean = false;
  clients: Client[] = [];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource(this.clients);

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private clientService: ClientService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getClients();
    this.clientService.getCodeStructure();
  }

  async getClients(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.clients = await this.clientService.getClients();
    this.dataSource = new MatTableDataSource(this.clients);
    console.log('state', this.dataSource.filteredData);
    await loading.dismiss();

  }

  async applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filer value', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

  }

  async doRefresh(event: Event){
    console.log('Async operation start !', event);

    const clients = await this.clientService.getClients();
    this.dataSource = new MatTableDataSource(clients);

    const target = (event.target as HTMLIonRefresherElement).complete();
    console.log('Async operation done!', target);

  }

  toggleSearchBar(){
    this.searchBar = !this.searchBar;

  }

  async onNewClient(){
    const modal = await this.modalCtrl.create({
      component: NewClientPage,

    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      if(res.data){
        console.log('res', res);
        this.getClients();
      }
    })
    
  }

  onSelected(id: string){
    this.router.navigateByUrl('/article/choos-article/' + id);
    
  }


}
