import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import {CommonModule} from "../../providers/common.module";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild()
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule { }
