import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import { TranslateModule } from '@ngx-translate/core';
import {CommonModule} from "../../providers/common.module";

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    CommonModule,
    IonicPageModule.forChild(TutorialPage),
    TranslateModule.forChild()
  ],
  exports: [
    TutorialPage
  ]
})
export class TutorialPageModule { }
