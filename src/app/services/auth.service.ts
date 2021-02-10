import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Plugins } from '@capacitor/core';
import { AUTH_KEY } from "../guards/auto-sign.guard";

const { Storage } = Plugins;

@Injectable()

export class AuthService {

    isAuth: boolean = false;
    userId: String;

    constructor(private auth: AngularFireAuth,
                private router: Router,
                private alertCtrl: AlertController){}
    
    async signIn(credential: {email: string, password: string}): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(credential.email, credential.password)
                .then(res => {
                    resolve(true);
                    this.isAuth = true;
                    Storage.set({key: AUTH_KEY, value: 'true'});
                    console.log('User signed In !');

                })
                .catch(error => {
                    console.log('Error while sign in !', error);
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
                    this.router.navigateByUrl('/');
                    console.log('Signed Out successfuly !');

                })
                .catch(error => {
                    reject(error.message);
                    console.log('Sign Out faild !');

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

        this.auth.onAuthStateChanged(user => {
            if(user){
                this.userId = user.uid;
                
            }else {
                this.isAuth = false;
                this.router.navigateByUrl('/sign-in', { replaceUrl: true});
                Storage.remove({key: AUTH_KEY});
                alert.present();

            }
        })
    }

}