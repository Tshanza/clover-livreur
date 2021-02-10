import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { MatTableModule } from '@angular/material/table';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { ArticleService } from './services/article.service';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { OrderService } from './services/order.service';
import { NewClientPage } from './pages/clients/new-client/new-client.page';
import { ClientListPage } from './pages/clients/client-list/client-list.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailPage } from './pages/my-orders/order-detail/order-detail.page';
import { OrderEditPage } from './pages/my-orders/order-edit/order-edit.page';
import { ImageService } from './services/image.service';
import { OrderPage } from './pages/my-orders/order/order.page';
import { UserService } from './services/user.service';
import { AnalyseService } from './services/analyse.service';
import { FormatService } from './services/format.service';

@NgModule({
  declarations: [
    AppComponent,
    NewClientPage,
    ClientListPage,
    OrderDetailPage,
    OrderEditPage,
    OrderPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireStorageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ArticleService,
    AuthService,
    ClientService,
    OrderService,
    ImageService,
    UserService,
    AnalyseService,
    FormatService
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
