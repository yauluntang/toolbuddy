import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import {User} from "../../providers/providers";
import {Items} from "../../providers/items/items";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  selectedIndex = 0;

  @ViewChild('tabs') tabs: Tabs;

  constructor(public navCtrl: NavController, public translateService: TranslateService, public user: User, public items: Items) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });
  }

  ionViewDidLoad() {
    this.user.subscribeUser();
    this.items.subscribeItems();

  }

  ionViewDidEnter(){
    if ( !this.user.userData.registered ){
      this.tabs.select(2);
      //nav.setRoot(TabsPage,{index:3});
    }
    else {

    }
  }
}
