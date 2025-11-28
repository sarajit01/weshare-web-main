import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {SharePopupComponent} from "../../share-popup/share-popup.component";
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommentsComponent} from "../../comments/comments.component";
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../../../components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {BSServiceService} from "../../../services/bsservice.service";
import {BSPopupComponent} from "../../bspopup/bspopup.component";
import {Overlay} from "@angular/cdk/overlay";
@Component({
  selector: 'app-listing-reaction',
  templateUrl: './listing-reaction.component.html',
  styleUrls: ['./listing-reaction.component.css']
})
export class ListingReactionComponent implements OnInit {

  @Input() listingType: string = ""
  @Input() listing: any
  @Output() onShare = new EventEmitter()
  constructor(
      private authService: AuthService,
      private listingService: ListingService,
      private dialog: MatDialog,
      private _bottomSheet: MatBottomSheet,
      private viewContainerRef: ViewContainerRef,
      private bsService: BSServiceService,
      private overlay: Overlay
  ) { }

  ngOnInit(): void {
  }

  openComments(): void {
    this._bottomSheet.open( CommentsComponent, {
      data : {
        listingType: this.listingType,
        listing: this.listing
      }
    });
  }


  async saveToFavorites() {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
          'Please login !',
          'Please login as customer to add any business or promotion to your favorites list !',
          'warning'
      )
    } else {

      try {

        if(this.listingType == "business") {
          const resp = await this.listingService.addToFavorites(this.listing.id, this.listingType, this.listing.main_category_id, this.authService.getUserID(), '').toPromise();
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
        if(this.listingType === "promotion"){
          const resp = await this.listingService.addToFavorites(this.listing.id, 'promotion', this.listing.business?.main_category_id, this.authService.getUserID(), '').toPromise();
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

        if(this.listingType === "loyalty_card" || this.listingType === "lc" || this.listingType === "tcf"){
          const resp = await this.listingService.addToFavorites(this.listing.id, 'loyalty_card', this.listing.business?.main_category_id, this.authService.getUserID(), '').toPromise();
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

        if(this.listingType === "ad" || this.listingType === "business_ad"){
          const resp = await this.listingService.addToFavorites(this.listing.business_id, 'business', this.listing.business?.main_category_id, this.authService.getUserID(), '').toPromise();
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

  onSharePrepare(){
    switch (this.listingType){
      case "ad" :

        this.openSharePopup(this.listing.business, this.listing.business_id, 'business')
        break;

      default:

        this.openSharePopup(this.listing, this.listing.id, this.listingType)


    }
  }

  openSharePopup(listing: any, listingId: any, listingType: any) {
  //   this.bsService.displayPopup(this.viewContainerRef, {
  //     listing: this.listing,
  //     listing_id : this.listing.id,
  //     listing_type: this.listingType
  //   } )
  // //  this.viewContainerRef.createComponent(BSPopupComponent)

    this._bottomSheet.open(SharePopupComponent, {
      data:  {
        listing: listing,
        listing_id : listingId,
        listing_type: listingType
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',
    });

  }





}
