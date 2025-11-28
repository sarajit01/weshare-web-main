import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {PlanService} from "../../../services/plan.service";
import {MatDialog} from "@angular/material/dialog";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../../../components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {Router} from "@angular/router";
import {
  BusinessDetailOptionsPopupComponent
} from "../../../business/business-detail-options-popup/business-detail-options-popup.component";
import {
  ListingDetailsBottomSheetComponent
} from "../../../business/listing-details-bottom-sheet/listing-details-bottom-sheet.component";
import {Overlay} from "@angular/cdk/overlay";



@Component({
  selector: 'app-business-classic-widget',
  templateUrl: './business-classic-widget.component.html',
  styleUrls: ['./business-classic-widget.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessClassicWidgetComponent),
      multi: true,
    }
  ]
})
export class BusinessClassicWidgetComponent implements OnInit {

  @Input() business:any ;
  @Input() quickPreview: boolean | undefined
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() deletable:any ;
  @Input() referrerId: any;
  @Input() displayOptionsOnly: boolean = false


  @Input() hasCustomActionOnClick: boolean = false
  @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>()
  @Output() shareBtnPressed = new EventEmitter()

  constructor(
    public listingService : ListingService ,
    private authService : AuthService,
    public planService: PlanService,
    public dialog: MatDialog,
    public _bottomSheet: MatBottomSheet,
    private router: Router,
    private overlay: Overlay

  ) { }

  ngOnInit(): void {

  }



  onChange: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.business = obj;
  }

  deleteConfirmation(){
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

  async deleteBusiness() {

    try {

      const resp = await this.listingService.deleteBusiness(this.business.id).toPromise();
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
  async saveToFavorites() {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
        'Please login !',
        'Please login as customer to add any business or promotion to your favorites list !',
        'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(this.business.id, 'business', this.business.main_category_id, this.authService.getUserID(), '').toPromise();
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

  // openSharePopup() {
  //   this._bottomSheet.open( SharePopupComponent, {
  //     data: {
  //       listing: this.business,
  //       listing_id : this.business.id,
  //       listing_type: 'business'
  //     }
  //   })
  //
  // }


  getQRCodeData(){
    let string = 'Listing Type:Business\nID:'+this.business.id+'\nCustomer ID:'+this.authService.getUserID();

    if(this.referrerId){
      string = string + '\nReferrer ID:'+this.referrerId ;
    }

    return encodeURI(string);
  }


  openBottomSheet() {
    if (this.authService.getRole() === "customer" && this.business.favorite) {
      var favorite = this.business.favorite;
      favorite.business = this.business;
      this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
        data: {
          favorite: favorite
        } ,
        scrollStrategy: this.overlay.scrollStrategies.noop()
      });
    } else {
        this._bottomSheet.open(BusinessOwnerActionsBottomSheetComponent, {
          data: {
             listing_type : "business",
             listing: this.business
          },
          scrollStrategy: this.overlay.scrollStrategies.noop()
        });

    }
  }

  viewDetails(){
    if (this.quickPreview){
      this.itemClicked.emit(this.business)

    } else {
      if (this.hasCustomActionOnClick) {
        this.itemClicked.emit(this.business)
        this.openBottomSheet()
      } else {
        // this.router.navigate(['/business-details/'+this.business.id])
        this.openDetailsInBottomSheet();
      }
    }
  }

  openDetailsInBottomSheet() {
    this._bottomSheet.open(ListingDetailsBottomSheetComponent, {
      data: {
        listing_type: 'business',
        listing_id: this.business.id
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }).afterDismissed().subscribe((data: any) => {
    });
  }

  onShare(listing: any){
    console.log(listing);
    this.shareBtnPressed.emit(listing)
   // this.onSharePressed.emit(listing)
  }

}
