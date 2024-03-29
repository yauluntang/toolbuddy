import {
  Component,
  Input
} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'item-row',
  templateUrl: 'item-row.html'
})
export class ItemRowComponent {
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
