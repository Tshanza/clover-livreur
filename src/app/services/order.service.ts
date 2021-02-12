import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Edition, Order } from "../models/order.model";
import { AuthService } from "./auth.service";

@Injectable()

export class OrderService {
    
    constructor(private db: AngularFirestore,
                private authService: AuthService,
                private auth: AngularFireAuth){}

    async createOrder(order: Order): Promise<boolean>{
        delete order._id;
        
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('orders').add({
                ...order,
                user: {...order.user},
                client: {...order.client},
                articles: order.articles,
                edition: {...order.edition},

            })
                .then(res => {
                    console.log('Order placed !');
                    resolve(true);

                })
                .catch(error => {

                    console.log('Place order failed !', error);
                    resolve(false);

                })
        })
    }

    async updateOrder(order: Order){
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('orders').doc(order._id).update({
                ...order,
                user: {...order.user},
                client: {...order.client},
                articles: order.articles,
                edition: {...order.edition},

            })
                .then(res => {
                    console.log('Order edited !');
                    resolve(true);

                })
                .catch(error => {
                    console.log('update order failed !', error);
                    resolve(false);

                })
        })

    }

    async loadUID(): Promise<string>{
        return new Promise((resolve, reject) => {
            this.auth.onAuthStateChanged(user => {
                resolve(user.uid);

            })
        })
    }

    async getOrders(): Promise<Order[]>{

        let uid: string = await this.loadUID();

        return new Promise((resolve, reject) => {
            this.db.firestore.collection('orders').where('user._id', '==', uid).get()
                .then(res => {
                    if(res.empty){
                        console.log('collection empty !!! Network issue');
                        resolve([]);
                        return;

                    }

                    const tmp = [];
                    res.forEach(order => {
                        tmp.push({...order.data(), _id: order.id});

                    })

                    //We can sort data here...
                    tmp.sort((a,b) => this.sortByDate(a,b));
                    tmp.sort((a,b) => this.sortByEdition(a,b));
                    resolve(tmp);

                })
                .catch(error => {
                    console.log('failed to load Orders !!!');
                    reject(error);

                })
        })
    }

    //Must be implemented later...
    async cancelOrder(order: Order){

        const edit = order.edition;
        edit.active = false;

        return new Promise((resolve, reject) => {
            this.db.firestore.collection('orders').doc(order._id).update({edition: {...edit}})
                .then(res => {
                    resolve(true);
                    console.log('order disabled', res);

                })
                .catch(error => {
                    resolve(false);
                    console.log('error on canceling order', error);

                })

        })
        
    }

    async getChangeRate(): Promise<number>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('configs').where('current', '==', true).get()
                .then(res => {
                    if(res.empty){
                        resolve(1);
                        return;
                    }

                    res.forEach(r => {
                        const result = r.data();
                        console.log('res data', result?.changeRate);
                        resolve(result?.changeRate);
                    })
                    // console.log('change rate', ret);

                })
                .catch(error => {
                    reject(error);

                })
        })
    }

    sortByDate(a: Order, b: Order){
       if(a.date === b.date) return 0;
       if(a.date > b.date) return -1;
       if(a.date < b.date) return 1;

    }

    sortByEdition(a: Order, b: Order){
        if(a.edition.active === b.edition.active) return 0;
        if(a.edition.active) return -1;
        if(!a.edition.active) return 1;
    }

}