import { NgModule } from '@angular/core';
import { CustomFormsModule } from 'ng2-validation'
import { BrMasker4Module } from 'brmasker4';
import {PhoneValidator} from "./validators/phoneValidator";
import {ItemRowComponent} from "./components/item-row";
import {TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";
import {IonicModule} from "ionic-angular";

@NgModule({
  imports:[
    HttpClientModule,
    TranslateModule,
    IonicModule,
    IonicStorageModule,
    BrMasker4Module,
    CustomFormsModule
  ],
  declarations: [
    PhoneValidator,
    ItemRowComponent
  ],
  exports: [
    BrMasker4Module,
    CustomFormsModule,
    PhoneValidator,
    ItemRowComponent
  ]
})
export class CommonModule {}
