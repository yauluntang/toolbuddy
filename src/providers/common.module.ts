import { NgModule } from '@angular/core';
import { CustomFormsModule } from 'ng2-validation'
import { BrMasker4Module } from 'brmasker4';
import {PhoneValidator} from "./validators/phoneValidator";
import {ItemRowComponent} from "./components/item-row";
import {TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";
import {IonicModule} from "ionic-angular";
import {CurrencyMaskModule} from "ng2-currency-mask";
import { TextMaskModule } from 'angular2-text-mask';
import {PricePipe} from "./pipes/price";
import {ItemCardComponent} from "./components/item-card";

@NgModule({
  imports:[
    HttpClientModule,
    TranslateModule,
    IonicModule,
    IonicStorageModule,
    BrMasker4Module,
    CurrencyMaskModule,
    CustomFormsModule,
    TextMaskModule
  ],
  declarations: [
    PhoneValidator,
    PricePipe,
    ItemRowComponent,
    ItemCardComponent
  ],
  exports: [
    BrMasker4Module,
    CustomFormsModule,
    PhoneValidator,
    ItemRowComponent,
    ItemCardComponent,
    TextMaskModule,
    CurrencyMaskModule,
    PricePipe
  ]
})
export class CommonModule {}
