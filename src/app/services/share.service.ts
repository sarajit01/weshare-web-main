import { Injectable } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SharePopupComponent} from "../shared/share-popup/share-popup.component";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(
      private _bottomSheet: MatBottomSheet
  ) { }

  openSharePopup(listing: any){
    this._bottomSheet.open( SharePopupComponent, {
      data:  {
        listing: listing,
        listing_id : listing.id,
        listing_type: listing.listing_type
      },
      panelClass: 'share-bottom-sheet',
    });
  }

}
