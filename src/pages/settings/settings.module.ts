import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';
import {CommonModule} from "../../providers/common.module";

@NgModule({
  declarations: [
    SettingsPage,

  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    CommonModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }
