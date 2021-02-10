import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";
import { OrderService } from "./order.service";

@Injectable()

export class AnalyseService {

    orders: Order[] = [];

    constructor(private orderService: OrderService){}

    async loadOrders(){

    }

    async totalSales(){
        
    }

    async salesByZone(): Promise<{zone: string, sale: number}[]>{
        return new Promise(async (resolve, reject) => {
            const orders = await this.orderService.getOrders();
            const tmp = [];

            orders.forEach(order => {
                const zone = order.client.zone;
                const isIn = tmp.findIndex(x => x?.zone === zone);
                let sale = 0;
                
                order.articles.forEach(article => {
                    sale += article.qty;

                });

                console.log('is in', isIn);

                if(isIn > -1){
                    const object = {zone: zone, sale: tmp[isIn]?.sale + sale};
                    tmp[isIn] = object;

                }else {
                    const object = {zone: zone, sale: sale};
                    tmp.push(object);

                }

            })

            console.log('sales by zone',tmp);
            resolve(tmp);

        })
        
    }

    async salesByProduct(): Promise<{id: string, name: string, detail: string, sale: number}[]>{
        return new Promise(async (resolve, reject) => {
            const list = await this.orderService.getOrders();
            const tmp = [];

            list.forEach(order => {
                order.articles.forEach(article => {
                    const index = tmp.findIndex(item => item?.id == article.code);
                    console.log('index val', index);

                    if(index > -1){
                        const sale = tmp[index].sale + article.qty;
                        tmp[index].sale = sale;

                    }else {
                        const name = `${article.category} ${article.name}`;
                        const detail = `${article.unit} x ${article.format} ${article.rate}`;

                        const i = {id: article.code, name: name, detail: detail, sale: article.qty};
                        tmp.push(i);

                    }
                })
            })

            console.log('sales by product', tmp);
            resolve(tmp);

        })
    }

}