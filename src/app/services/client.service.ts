import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Client } from "../models/client.model";
import firebase from 'firebase';

@Injectable()

export class ClientService {

    constructor(private db: AngularFirestore){}

    async getClients(): Promise<Client[]>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('clients').get()
                .then(res => {
                    if(res.empty){
                        console.log('Empty collection, maybe network issue !');
                        resolve([]);
                        return;
                    }

                    const tmp = [];
                    res.forEach(client => {
                        tmp.push({...client.data(), _id: client.id});

                    })

                    //Data can be sort here !

                    resolve(tmp);

                })
                .catch(error => {
                    console.log('Failed to load client list !', error);
                    resolve([]);

                })
        })
    }

    async getClient(id: string): Promise<Client>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('clients').doc(id).get()
                .then(res => {
                    const tmp = res.data();
                    const client: Client = new Client(res.id, tmp.code, tmp.ets, tmp.zone, tmp.avenue, tmp.quartier, tmp.commune, tmp.reference, tmp.gerant, tmp.contact);
                    
                    resolve(client);
                })
                .catch(error => {
                    console.log('client get', error);

                })
        })
    }

    async updateClient(client: Client){
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('clients').doc(client._id).update({
                ets: client.ets,
                zone: client.zone,
                commune: client.commune,
                quartier: client.quartier,
                avenue: client.avenue,
                reference: client.reference,
                gerant: client.gerant,
                contact: client.contact

            })
                .then(res => {
                    console.log('Client Infos updated !'),
                    resolve(true);

                })
                .catch(error => {
                    console.log('Client update failed !', error);
                    resolve(false);

                })

        })

    }

    async createClient(client: Client): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('clients').add({
                ets: client.ets,
                code: "",
                zone: client.zone,
                commune: client.commune,
                quartier: client.quartier,
                avenue: client.avenue,
                reference: client.reference,
                gerant: client.gerant,
                contact: client.contact
            })
                .then(res => {
                    console.log('create client succed !');
                    resolve(true);

                })
                .catch(error => {
                    console.log('create client failed !', error);
                    resolve(false);

                })

        })
    }

    //Generate Id process...

    async getCodeStructure(): Promise<string>{
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('code').doc('id').get()
                .then(res => {
                    // console.log('get code structure', res.data());
                    let code: number = res.data().code;
                    let syntaxe: string = res.data().syntaxe;

                    const tmpCode = code.toString();
                    syntaxe = syntaxe.slice(0, syntaxe.length - tmpCode.length);

                    const idClient = syntaxe.concat(tmpCode);

                    console.log('Resultat final', idClient);

                    resolve(idClient);

                })
                .catch(error => {
                    console.log('error', error);
                    resolve('');

                })
        })
    }

    async setId(id: string, value: string){
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('clients').doc(id).update({code: value})
                .then(res => {
                    console.log('set id to client !');
                    resolve(true);

                })
                .catch(error => {
                    console.log('error', error);
                    resolve(false);

                })

        })

    }

    async updateId(){
        return new Promise((resolve, reject) => {
            this.db.firestore.collection('code').doc('id').update({code: firebase.firestore.FieldValue.increment(1)})
                .then(res => {
                    console.log('Update Id content !');
                    resolve(true);

                })
                .catch(error => {
                    console.log('Error', error);

                })

        })
    }

    sortByDate(a: Client, b: Client){
        
    }
}