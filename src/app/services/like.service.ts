import { Injectable } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AuthService} from "./auth.service";
import {ListingService} from "./listing.service";
@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
      private authService: AuthService,
      private listingService: ListingService
  ) { }

  async saveToFavorites(listing: any,listingType: string) {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
          'Please login !',
          'Please login as customer to add any business or promotion to your favorites list !',
          'warning'
      )
    } else {

      try {

        if(listingType == "business") {
          const resp = await this.listingService.addToFavorites(listing.id, listingType, listing.main_category_id, this.authService.getUserID(), '').toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The business is now in your favorites list ! you will get notifications for this business !',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                'Unable to add to your favorites list !',
                'warning'
            )
          }

        }
        if(listingType === "promotion"){
          const resp = await this.listingService.addToFavorites(listing.id, 'promotion', listing.business?.main_category_id, this.authService.getUserID(), '').toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The promotion is now in your favorites list ! you will get notifications for this promotion !',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                resp.error,
                'warning'
            )
          }


        }

        if(listingType === "loyalty_card" || listingType === "lc" || listingType === "tcf"){
          const resp = await this.listingService.addToFavorites(listing.id, 'loyalty_card', listing.business?.main_category_id, this.authService.getUserID(), '').toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The LC is now in your favorites list ! you will get notifications for this LC!',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                resp.error,
                'warning'
            )
          }
        }

        if(listingType === "ad" || listingType === "business_ad"){
          const resp = await this.listingService.addToFavorites(listing.business_id, 'business', listing.business?.main_category_id, this.authService.getUserID(), '').toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The Business is now in your favorites list ! you will get notifications for this Business!',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                resp.error,
                'warning'
            )
          }
        }

      } catch ($ex) {

        console.log($ex);
        Swal.fire(
            'Failed',
            'Something went wrong !',
            'warning'
        )

      }
    }

  };

}
