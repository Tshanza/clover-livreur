import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Order } from "../models/order.model";

@Injectable()

export class OrderService {
    
    constructor(private db: AngularFirestore){}

    async createOrder(order: Order): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('orders').add({
                user: {...order.user},
                client: {...order.client},
                articles: order.articles,
                date: order.date,
                total: order.total

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
                date: order.date,
                client: order.client,
                articles: order.articles,
                total: order.total,
                user: order.user
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

    async getOrders(): Promise<Order[]>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('orders').get()
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
        return new Promise((resolve, reject) => {
            
        })
    }

    sortByDate(a: Order, b: Order){
       if(a.date === b.date) return 0;
       if(a.date > b.date) return 1;
       if(a.date < b.date) return -1;

    }

}