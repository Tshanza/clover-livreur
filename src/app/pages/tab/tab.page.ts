import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

  tabs = [
    {
      title: 'Acceuil',
      icon: 'home',
      url: 'home'
    },
    {
      title: 'Recents',
      icon: 'pulse',
      url: 'recent'
    },
    {
      title: 'Clients',
      icon: 'people',
      url: 'client'
    },

  ]
  constructor() { }

  ngOnInit() {
  }

}
