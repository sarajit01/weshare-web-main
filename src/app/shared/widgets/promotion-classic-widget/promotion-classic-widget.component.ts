import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ROUTES} from "../../../core/routes";
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {FavoriteService} from "../../../services/favorite.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {PlanService} from "../../../services/plan.service";
import {SharePopupComponent} from "../../share-popup/share-popup.component";
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
  ListingDetailsBottomSheetComponent
} from "../../../business/listing-details-bottom-sheet/listing-details-bottom-sheet.component";
import {Overlay} from "@angular/cdk/overlay";
@Component({
  selector: 'app-promotion-classic-widget',
  templateUrl: './promotion-classic-widget.component.html',
  styleUrls: ['./promotion-classic-widget.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PromotionClassicWidgetComponent),
      multi: true,
    }
  ]
})
export class PromotionClassicWidgetComponent implements OnInit {

  @Input() quickPreview: boolean | undefined
  @Input() business: any
  @Input() promotion:any ;
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() isFavoriteRemovable : any ;
  @Input() deletable:any ;
  @Input() isAdmin: any;
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  @Input() referrerId: any;
  @Input() displayOptionsOnly: boolean = false

  @Input() hasCustomActionOnClick: boolean = false
  @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>()

  routes = ROUTES;


  constructor(
    public listingService : ListingService ,
    private authService : AuthService ,
    public favoriteService : FavoriteService,
    public sweet : SweetAlertService,
    public planService: PlanService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private overlay: Overlay
  ) { }



  onChange: any;
  cloneProgress: any = false;


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.promotion = obj;
  }

  deleteConfirmation(){
    Swal.fire({
      title: 'Are you sure to delete this promotion ?',
      text: 'All data related to this promotion will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.deletePromotion();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async deletePromotion() {

    try {

      const resp = await this.listingService.deletePromotion(this.promotion.id).toPromise();
      console.log(resp);
      if(resp.success){
        Swal.fire(
          'Deleted !',
          'Promotion has been deleted successfully.',
          'success'
        );

        setTimeout(() =>{
          window.location.reload();
        } , 2000);

      }

      if(resp.error){
        Swal.fire(
          'Failed',
          'Unable to delete the promotion !',
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

        const resp = await this.listingService.addToFavorites(this.promotion.id, 'promotion', this.promotion.business.main_category_id, this.authService.getUserID(), '').toPromise();
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


      } catch ($ex) {

        console.log($ex);
        Swal.fire(
          'Failed',
          'Something went wrong !',
          'warning'
        )

      }
    }

  }

  viewCode(code: string){
    this.sweet.successNotification( code , 'Enter this code to get discount on your purchase !'  );
  }


  async clonePromotion() {
    try {

      this.cloneProgress = true ;
      const resp = await this.listingService.clonePromotion(this.promotion.id).toPromise();
      console.log(resp);
      if (resp.success) {
        Swal.fire(
          resp.success,
          'A copy of the promotion has been created , you can now customize',
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

  ngOnInit(): void {
    if(!this.promotion.business && this.business){
      this.promotion.business = this.business ;
    }
  }

  async addToFeaturedListing(featuredType: string) {
    try {
      const resp = await this.listingService.addFeaturedListings({
        listing_type: 'promotion',
        listing_id: this.promotion.id ,
        featured_type: featuredType
      }).toPromise();
      console.log(resp);
      if (resp.success) {
        Swal.fire(
          'Added to '+featuredType+' list',
          resp.success,
          'success'
        );

        this.dataUpdated.emit(null);

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

  markAsTrending() {
    this.addToFeaturedListing('trending')
  }

  markAsFeatured() {
    this.addToFeaturedListing('featured')
  }

  markAsPopular() {
    this.addToFeaturedListing('popular')
  }

  markAsSponsored() {
    this.addToFeaturedListing('sponsored')
  }

  async removeFromFeatured(featured: any) {
    try {
      const resp = await this.listingService.removeFeaturedListing(featured.id).toPromise();
      console.log(resp);
      if (resp.success) {
        Swal.fire(
          'Removed successfully',
          resp.success,
          'success'
        );
        this.dataUpdated.emit(null);
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

  };

  openSharePopup() {
    this._bottomSheet.open( SharePopupComponent, {
      data: {
        listing: this.promotion,
        listing_id : this.promotion.id,
        listing_type: 'promotion'
      },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    })
  }

  getQRCodeData(){
    let string = 'Listing Type:'+this.promotion.promotion_type+' '+this.promotion.code+'\nID:'+this.promotion.id+'\nCustomer ID:'+this.authService.getUserID();

    if(this.referrerId){
      string = string + '\nReferrer ID:'+this.referrerId ;
    }

    return encodeURI(string);
  }

  openBottomSheet() {
    if (this.authService.getRole() === "customer" && this.promotion.favorite) {
      var favorite = this.promotion.favorite;
      favorite.promotion = this.promotion;
      this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
        data: {
          favorite: favorite
        },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      });
    } else {
      this._bottomSheet.open(BusinessOwnerActionsBottomSheetComponent, {
        data: {
          listing_type : "promotion",
          listing: this.promotion
        },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      });

    }
  }

  viewDetails(){
    if (this.quickPreview){
      this.itemClicked.emit(this.promotion)
    } else {
      if (this.hasCustomActionOnClick) {
        this.itemClicked.emit(this.business)
        this.openBottomSheet()
      } else {
        // this.router.navigate(['/promotion-details/'+this.promotion.id])
        this.openDetailsInBottomSheet()
      }
    }
  }

  openDetailsInBottomSheet() {
    this._bottomSheet.open(ListingDetailsBottomSheetComponent, {
      data: {
        listing_type: 'promotion',
        listing_id: this.promotion.id
      },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }).afterDismissed().subscribe((data: any) => {
    });
  }

}
