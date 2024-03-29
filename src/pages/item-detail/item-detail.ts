import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public items: Items) {
    this.item = navParams.get('item');
  }
  done(){
    this.navCtrl.push('PaymentPage', {
      item: this.item
    });
  }

}
