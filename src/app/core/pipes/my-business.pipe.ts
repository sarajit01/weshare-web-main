import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Pipe({
  name: 'myBusiness'
})
export class MyBusinessPipe implements PipeTransform {

  authUserId: any;

  constructor(private authService: AuthService) {

  }

  transform(listings: any[]): any[] {
    this.authUserId = this.authService.getUserID();
    return listings.filter(listing => {
      return listing.user_id.toString() === this.authUserId.toString() ;
    });
  }

}
