import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Article } from "../models/article.model";

@Injectable()

export class ArticleService {

    constructor(private db: AngularFirestore){}

    async getAricles(): Promise<Article[]>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('articles').get()
                .then(res => {
                    if(res.empty){
                        console.log('empty collection, maybe network issue !');
                        resolve([]);
                        return;
                    } 

                    const tmp = [];
                    res.forEach(article => {
                        tmp.push({...article.data(), _id: article.id});

                    })

                    //I can sort data
                    tmp.sort((a,b) => this.sortByName(a,b));
                    resolve(tmp.sort((a,b)=> this.sortByFormat(a,b)));

                })
                .catch(error => {
                    console.log('fail to load articles', error);
                    resolve([]);
                    
                })
        })
    }

    sortByFormat(a: Article, b: Article){
        let x = a.format;
        let y = b.format;

        x = x === 1 ? x * 1000 : x;
        y = y === 1 ? y * 1000 : y;

        if(x == y) return 0;
        if(x > y) return -1;
        if(x < y) return 1;
    }

    sortByName(a: Article, b: Article){
        if(a.name === b.name) return 0;
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;

    }

}