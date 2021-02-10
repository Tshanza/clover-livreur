import { User } from './user.model';
import { Client } from './client.model';
import { Article } from './article.model';
export class Order {

    constructor(public _id: string,
                public user: User,
                public client: Client,
                public articles: Article[],
                public date: number,
                public changeRate: number,
                public orderNum: string,
                public payment: string,
                public total?: number){}

}