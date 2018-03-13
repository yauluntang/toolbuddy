import { NgModule } from '@angular/core';
import { CustomFormsModule } from 'ng2-validation'
import { BrMaskerModule } from 'brmasker-ionic-3';
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
    BrMaskerModule,
    CustomFormsModule
  ],
  declarations: [
    PhoneValidator,
    ItemRowComponent
  ],
  exports: [
    BrMaskerModule,
    CustomFormsModule,
    PhoneValidator,
    ItemRowComponent
  ]
})
export class CommonModule {}
