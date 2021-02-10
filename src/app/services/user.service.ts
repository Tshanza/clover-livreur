import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "../models/user.model";

@Injectable()

export class UserService {

    constructor(private auth: AngularFireAuth,
                private db: AngularFirestore){}

    async getUserInfos(): Promise<User>{
        return new Promise((resolve, reject) => {
            this.auth.onAuthStateChanged(user => {
                if(user){
                    this.db.firestore.collection('users').doc(user.uid).get()
                        .then(res => {
                            resolve(new User(res.id, res.data()?.userName, res.data()?.name, res.data()?.phoneNumber, res.data()?.password));

                        })
                        .catch(error => {
                            console.log('error ', error);
                            reject(error);

                        })

                }

            })

        })

    }
    
}