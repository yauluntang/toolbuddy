import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ConfirmPage } from './confirm';

@NgModule({
  declarations: [
    ConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPage),
    TranslateModule.forChild()
  ],
  exports: [
    ConfirmPage
  ]
})
export class CconfirmPageModule { }
