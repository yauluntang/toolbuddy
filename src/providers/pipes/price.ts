import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'priceFormat' })
export class PricePipe implements PipeTransform {
  transform(price) {
    if ( typeof price === 'number' ) {
      return '$ ' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return price;
  }
}
