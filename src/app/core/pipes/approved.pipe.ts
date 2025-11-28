import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approved'
})
export class ApprovedPipe implements PipeTransform {

  transform(listings: any[]): any[] {

    return listings.filter(listing => {
      return listing.status.toString() === 'approved'
    });
  }
}
