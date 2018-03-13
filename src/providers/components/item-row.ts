import {
  Component,
  AfterViewChecked,
  Input,
  OnChanges,
  SimpleChange
} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'item-row',
  templateUrl: 'item-row.html'
})
export class ItemRowComponent implements OnChanges, AfterViewChecked {
  @Input('item') item;
  @Input('isOwner') isOwner;

  constructor(public navCtrl: NavController) {

  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {

  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {

  }
  openItem(item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
