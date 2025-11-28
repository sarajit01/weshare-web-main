import {Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {ROUTES} from "../../../core/routes";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../../../components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {AuthService} from "../../../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ad-classic-widget',
  templateUrl: './ad-classic-widget.component.html',
  styleUrls: ['./ad-classic-widget.component.css']
})
export class AdClassicWidgetComponent {

  @Input() quickPreview: boolean | undefined
  @Input() ad:any ;
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() deletable:any ;
  @Input() isAdmin: any;
  @Input() displayOptionsOnly: boolean = false ;
  @Output() itemClicked = new EventEmitter<any>()
  cloneProgress: any = false;
  routes = ROUTES;

  constructor(
    public listingService : ListingService,
    private authService: AuthService,
    private _bottomSheet: MatBottomSheet,
    private router: Router
  ) { }



  onChange: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.ad = obj;
  }

  deleteConfirmation(){
    Swal.fire({
      title: 'Are you sure to delete this ad ?',
      text: 'All data related to this business ad will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.deleteBusinessAd();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async deleteBusinessAd() {

    try {

      const resp = await this.listingService.deleteBusinessAd(this.ad.id).toPromise();
      console.log(resp);
      if(resp.success){
        Swal.fire(
          'Deleted !',
          'Business Ad has been deleted successfully.',
          'success'
        );

        setTimeout(() =>{
          window.location.reload();
        } , 2000);

      }

      if(resp.error){
        Swal.fire(
          'Failed',
          'Unable to delete the business ad !',
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


  async cloneBusinessAd() {
    try {

      this.cloneProgress = true ;
      const resp = await this.listingService.cloneAd(this.ad.id).toPromise();
      console.log(resp);
      if (resp.success) {
        Swal.fire(
          resp.success,
          'A copy of the business ad has been created , you can now customize',
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
      this.cloneProgress = false ;
    }

  }

  markAsCheapDeal() {

  }

  openBottomSheet() {
    if (this.authService.getRole() === "business") {

      this._bottomSheet.open(BusinessOwnerActionsBottomSheetComponent, {
        data: {
          listing_type : "ad",
          listing: this.ad
        }
      });

    }
  }

  viewDetails() {
    if (this.quickPreview){
      this.itemClicked.emit(this.ad.business);
    } else {
      this.router.navigate(['/business-details/' + this.ad.business.id])
    }
  }
}
