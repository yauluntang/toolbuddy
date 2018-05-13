import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { WelcomePage } from './welcome';
import {CommonModule} from "../../providers/common.module";

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    CommonModule,
    IonicPageModule.forChild(WelcomePage),
    TranslateModule.forChild()
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule { }
