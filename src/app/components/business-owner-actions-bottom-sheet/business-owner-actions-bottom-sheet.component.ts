import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {FavoriteService} from "../../services/favorite.service";
import {Router} from "@angular/router";
import {ListingService} from "../../services/listing.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ShareService} from "../../services/share.service";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";

@Component({
  selector: 'app-business-owner-actions-bottom-sheet',
  templateUrl: './business-owner-actions-bottom-sheet.component.html',
  styleUrls: ['./business-owner-actions-bottom-sheet.component.css']
})
export class BusinessOwnerActionsBottomSheetComponent implements OnInit {


  constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<BusinessOwnerActionsBottomSheetComponent>,
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet,
      private listingService: ListingService,
      private router: Router,
      private snackbarService: SnackbarService,
      private shareService: ShareService
  ) { }

  ngOnInit(): void {
  }


  closePopup(){
    this._bottomSheet.dismiss(true);
  }

  xDown = null;
  yDown = null;
  handleTouchStart(evt: any) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };
  handleTouchMove(evt: any) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;
    if(Math.abs( xDiff )+Math.abs( yDiff )> 20){ //to deal with to short swipes

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */
          console.log('left!');
        } else {/* right swipe */
          console.log('right!');
        }
      } else {
        if ( yDiff > 0 ) {/* up swipe */
          console.log('Up!');
        } else { /* down swipe */
          console.log('Down!');
          this._bottomSheet.dismiss()
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };

  editPromotion(id: number) {
    this.router.navigate(['/business/edit-promotion/' + id]);
    this.closePopup()
  }
  editBusiness(id: number) {
    this.router.navigate(['/business/edit/' + id]);
    this.closePopup()
  }
  editLc(id: number) {
      this.router.navigate(['/business/loyalty-card/edit/' + id]);
      this.closePopup()
  }

  deleteBusinessConfirmation(){
    Swal.fire({
      title: 'Are you sure to delete this business ?',
      text: 'All data related to this business will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.deleteBusiness();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  shareBusiness(){
    this._bottomSheet.open(SharePopupComponent, {
      data:  {
        listing: this.data.listing,
        listing_id : this.data.listing.id,
        listing_type: 'business'
      }
    });
  }

  async deleteBusiness() {

    try {

      const resp = await this.listingService.deleteBusiness(this.data.listing.id).toPromise();
      console.log(resp);
      if(resp.success){
        Swal.fire(
            'Deleted !',
            'Business has been deleted successfully.',
            'success'
        );

        setTimeout(() =>{
          window.location.reload();
        } , 2000);

      }

      if(resp.error){
        Swal.fire(
            'Failed',
            'Unable to delete the business !',
            'warning'
        )
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
  async cloneBusiness() {
    try {

      const resp = await this.listingService.cloneBusiness(this.data.listing.id).toPromise();
      console.log(resp);
      if (resp.success) {
        Swal.fire(
            resp.success,
            'A copy of the business has been created , you can now customize',
            'success'
        );

        setTimeout(() =>{
          window.location.reload();
        } , 3000);

      }

      if (resp.error) {
        Swal.fire(
            'Failed',
            resp.error,
            'warning'
        )
      }


    } catch ($ex) {

      console.log($ex);
      Swal.fire(
          'Failed',
          'Something went wrong !',
          'warning'
      )

    } finally {
    }

  }



  deleteConfirmation(id: any){
    Swal.fire({
      title: 'Are you sure to delete this Loyalty Card ?',
      text: 'All data related to this Loyalty card will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.deleteLoyaltyCard(id);

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }


  async deleteLoyaltyCard(id: any) {
    try {
      const resp = await this.listingService.deleteLC(id).toPromise();
      console.log(resp);
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success)
        setTimeout(()=> {
          window.location.reload()
        }, 1000)
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
      this.snackbarService.openSnackBar('Something went wrong !');
    }
  }

    editAd(id: number) {
      this.router.navigate(['/business/edit-ad/' + id]);
      this.closePopup()
    }

  appointmentSettings() {
    this.router.navigate(['/business/appointment-settings/' + this.data.listing.id], {queryParams: {tab: 'time-slots'}})
    this.closePopup()
  }

  rewardsSettings(){
    this.router.navigate(['/business/rewards-table/' + this.data.listing.id]);
    this.closePopup()
  }
}
