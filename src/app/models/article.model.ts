export class Article {

    constructor(public _id: string,
                public name: string,
                public code: string,
                public category: string,
                public format: number,
                public rate: string,
                public imageUrl: string,
                public unit: number,
                public price: number,
                public currency: string,
                public qty?: number,
                public total?: number){}

}