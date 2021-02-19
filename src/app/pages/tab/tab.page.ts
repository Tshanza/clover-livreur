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
      url: 'home',
      size: ''
    },
    {
      title: 'Clients',
      icon: 'bag-add',
      url: 'client',
      size: 'large'
    },
    {
      title: 'Recents',
      icon: 'bag-check',
      url: 'recent',
      size: 'large'
    },

  ]
  constructor() { }

  ngOnInit() {
  }

}
