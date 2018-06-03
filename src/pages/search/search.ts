import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  searchterm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    this.searchterm = null;
  }

  openItem(item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
