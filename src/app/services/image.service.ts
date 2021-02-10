import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable()

export class ImageService {

    listImages = [];

    constructor(private db: AngularFireStorage){
        this.loadImages();
        
    }

    async loadImages(){
        return new Promise((resolve, reject) => {
            this.db.storage.ref().child('clover products').listAll()
                .then(res => {
                    const tmp = [];

                    res.items.forEach(async (item) => {
                        const url = await item.getDownloadURL();
                        tmp.push({name: item.name, url: url});

                    })

                    resolve(tmp);
                    this.listImages = tmp;

                })
                .catch(error => {
                    reject(error);

                })

        })

    }

}