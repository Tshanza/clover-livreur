import { Injectable } from "@angular/core";
import * as moment from 'moment';

// moment.locale ('fr', {
//     mois: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split (' _ '),
//     semaine: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split (' _ '),
//     relativeTime: {
//         avenir: 'dans %s',
//         passé:' il y a% s',
//         s: 'quelques secondes',
//         m: 'une minute',
//         mm: '% d minutes',
//         h: 'une heure',
//         hh: '% d heures',
//         d: 'un jour',
//         dd: '% d jours',
//         M: 'un mois',
//         MM: '% d mois',
//         y: 'un an',
//         aa: '% d ans'
//     }
//   });

//   moment.locale('')
  
  moment.locale ('fr');

@Injectable()

export class FormatService{

    

    constructor(){}

    relativeTime(time: number){
        const date = new Date(time);
        return moment(date).fromNow();
        
    }

    localDateCourt(time: number){
      const date = new Date(time);
      return moment(date).format('lll');
      
    }

    localDateLong(time: number){
      const date = new Date(time);
      return moment(date).format('LLLL');

    }

    toDateString(time: any){
      return new Date(time).toDateString();
      
    }
    
}