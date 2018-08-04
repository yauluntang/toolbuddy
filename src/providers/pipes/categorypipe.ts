import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'categoryPipe' })
export class CategoryPipe implements PipeTransform {
  transform( list, category ) {

    return list.filter(x=>{
      if ( x.category === category ){
        return true;
      }
      return false;
    })
  }
}
