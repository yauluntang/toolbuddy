import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'itemSearch' })
export class ItemSearch implements PipeTransform {
  transform( list, searchterm ) {
    console.log(list,searchterm)
    if ( !searchterm || searchterm.length < 1 ){
      return list;
    }
    let s = searchterm.toLowerCase();

    return list.filter(x=>{
      if ( x.name.toLowerCase().indexOf(s) != -1 ){
        return true;
      }
      if ( x.about.toLowerCase().indexOf(s) != -1 ){
        return true;
      }
      return false;
    })
  }
}
