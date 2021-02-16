import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Plugins } from '@capacitor/core';
import { AUTH_KEY } from "../guards/auto-sign.guard";

export const USER_ID = "userID";
export const USER_INFO = {};

const { Storage } = Plugins;

@Injectable()

export class AuthService {

    isAuth: boolean = false;
    userId;

    constructor(private auth: AngularFireAuth,
                private router: Router,
                private alertCtrl: AlertController,
                private db: AngularFirestore){

        this.getUserId();
    }
    

    async getUserId(){
        const value = (await Storage.get({key: USER_ID})).value;
        this.userId = JSON.parse(value);
        //console.log('get user id', this.userId);

    }

    async signIn(credential: {email: string, password: string}): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(credential.email, credential.password)
                .then(res => {
                    resolve(true);
                    this.isAuth = true;
                    Storage.set({key: AUTH_KEY, value: 'true'});
                    //console.log('User signed In !');
                    Storage.set({key: USER_ID, value: ''})

                })
                .catch(error => {
                    //console.log('Error while sign in !', error);
                    reject(error.message);

                })
        })
    }

    async signOut(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.auth.signOut()
                .then(res => {
                    resolve(true);
                    this.isAuth = false;

                    Storage.remove({key: AUTH_KEY});
                    Storage.remove({key: USER_ID});

                    this.router.navigateByUrl('/');
                    //console.log('Signed Out successfuly !');

                })
                .catch(error => {
                    reject(error.message);
                    //console.log('Sign Out faild !');

                })

        })
    }

    async checkAuthStatus(){
        const alert = await this.alertCtrl.create({
            header: 'Information !',
            subHeader: 'Vous n\'etes plus reconnu par cette application, veuillez contacter l\'administateur. Merci!',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel'
                }
            ]
        });

        this.auth.onAuthStateChanged(async (user) => {
            if(user){
                const res = await this.db.firestore.collection('users').doc(user.uid).get();
                //console.log('get user info test');
                USER_INFO['_id'] = res.id;
                USER_INFO['userName'] = res.data().userName;
                USER_INFO['name'] = res.data().name;
                USER_INFO['depot'] = res.data().depot;
                USER_INFO['phoneNumber'] = res.data().phoneNumber;
                USER_INFO['password'] = res.data().password;

                if(!(this.userId && this.userId.uid === user.uid)){
                    
                    const uid = {
                        uid: user.uid,
                        userName: user.email,
                        name: user.displayName,
                        depot: res.data()?.depot
                    }
    
                    Storage.set({key: USER_ID, value: JSON.stringify(uid)});
                }
               
            }else {
                this.isAuth = false;
                this.router.navigateByUrl('/sign-in', { replaceUrl: true});
                Storage.remove({key: AUTH_KEY});
                alert.present();

            }
        })
    }

}