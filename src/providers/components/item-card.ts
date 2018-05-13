import {
  Component,
  Input
} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'item-card',
  templateUrl: 'item-card.html'
})
export class ItemCardComponent {
  @Input('item') item;
  @Input('isOwner') isOwner;
  constructor(public navCtrl: NavController) {}

  openItem(item) {
    if ( this.isOwner ) {
      this.navCtrl.push('ItemCreatePage', {
        item: item
      });
    }
    else {
      this.navCtrl.push('ItemDetailPage', {
        item: item
      });
    }
  }
}
