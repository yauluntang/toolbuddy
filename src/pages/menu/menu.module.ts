import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MenuPage } from './menu';
import {CommonModule} from "../../providers/common.module";

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    CommonModule,
    IonicPageModule.forChild(MenuPage),
    TranslateModule.forChild()
  ],
  exports: [
    MenuPage
  ]
})
export class MenuPageModule { }
