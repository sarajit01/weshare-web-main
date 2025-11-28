import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBusiness'
})
export class SearchBusinessPipe implements PipeTransform {

  transform(items: any[], searchTxt: string): any[] {
    if(!items || !items.length) return items;
    if(!searchTxt || !searchTxt.length) return items;
    return items.filter(item => {
      let businessName = item.business_name_prefix+' '+item.business_name ;
      return businessName.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }

}
