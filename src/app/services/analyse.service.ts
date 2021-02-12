import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";
import { OrderService } from "./order.service";

@Injectable()

export class AnalyseService {

    orders: Order[] = [];

    constructor(private orderService: OrderService){
        this.loadOrders();

    }

    async loadOrders(){
        this.orders = await this.orderService.getOrders();
    }

    async totalSales(list: Order[]){

        const tmp = {client: 0, article: 0, montant: 0};

        list.forEach(order => {
            tmp.montant += order.articles.map(article => article.qty * article.price).reduce((total, item) => total + item, 0);            
            tmp.article += order.articles.map(article => article.qty).reduce((total, item) => total + item, 0);
            tmp.client++;

        });

        console.log('total sale', tmp);
        return tmp;
        
    }

    

    async salesByZone(list: Order[]): Promise<{zone: string, sale: number, client: number}[]>{
        return new Promise(async (resolve, reject) => {
            // const orders = await this.orderService.getOrders();
            const tmp = [];

            list.forEach(order => {
                const zone = order.client.zone;
                const sale = order.articles.map(article => article.qty).reduce((t, i) => t + i, 0);
                const index = tmp.findIndex(item => item?.zone === zone);

                if(index > -1){
                    const byzone = {zone: zone, sale: tmp[index]?.sale + sale, client: tmp[index]?.client + 1};
                    tmp[index] = byzone;

                }else {
                    const byzone = {zone: zone, sale: sale, client: 1};
                    tmp.push(byzone);

                }

            })

            console.log('sales by zone',tmp);
            resolve(tmp);

        })
        
    }

    async salesByProduct(list: Order[]): Promise<{name: string, sale: number}[]>{
        return new Promise(async (resolve, reject) => {
            // const list = await this.orderService.getOrders();
            // const tmp = [];
            const test = [];

            list.forEach(item => {//Category, format, Qty from(category, name, format, rate)
                const articles = item.articles;
                articles.map(article => {
                    const category = article.category;
                    const name = article.subCategory;
                    const format = article.format;
                    const rate = article.rate;
                    const unite = article.unit;
                    const qty = article.qty;

                    

                    return {name: `${category} ${name} (${unite} x ${format} ${rate})`, sale: qty};
                })
                .forEach(tab => {
                    const index = test.findIndex(item => item?.name === tab.name);

                    if(index > -1){
                        test[index].sale += tab.sale;

                    }else {
                        test.push(tab);

                    }
                })
                
            })

            console.log('test tmp', test)

            // list.forEach(order => {
            //     order.articles.forEach(article => {
            //         const index = tmp.findIndex(item => item?.id == article.code);
            //         console.log('index val', index);

            //         if(index > -1){
            //             const sale = tmp[index].sale + article.qty;
            //             tmp[index].sale = sale;

            //         }else {
            //             const name = `${article.category} ${article.name}`;
            //             const detail = `${article.unit} x ${article.format} ${article.rate}`;

            //             const i = {id: article.code, name: name, detail: detail, sale: article.qty};
            //             tmp.push(i);

            //         }
            //     })
            // })

            // console.log('sales by product', tmp);
            resolve(test);

        })
    }

}