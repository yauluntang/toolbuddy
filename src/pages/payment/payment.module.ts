import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PaymentPage } from './payment';
import {CommonModule} from "../../providers/common.module";

@NgModule({
  declarations: [
    PaymentPage,
  ],
  imports: [
    CommonModule,
    IonicPageModule.forChild(PaymentPage),
    TranslateModule.forChild()
  ],
  exports: [
    PaymentPage
  ]
})
export class PaymentPageModule { }
