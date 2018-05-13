import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';


import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {


  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    this.navCtrl.push('ItemCreatePage', {

    });
    /*
    let addModal = this.modalCtrl.create('ItemCreatePage');

    addModal.present();*/
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item) {
    this.navCtrl.push('ItemCreatePage', {
      item: item
    });
  }
}
