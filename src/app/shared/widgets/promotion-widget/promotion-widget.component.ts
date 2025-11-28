import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {FavoriteService} from "../../../services/favorite.service";
import {ROUTES} from "../../../core/routes";
import {SweetAlertService} from "../../../services/sweet-alert.service";

@Component({
  selector: 'app-promotion-widget',
  templateUrl: './promotion-widget.component.html',
  styleUrls: ['./promotion-widget.component.css'] ,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PromotionWidgetComponent),
      multi: true,
    }
  ]
})
export class PromotionWidgetComponent implements ControlValueAccessor, OnInit {

  @Input() business: any
  @Input() promotion:any ;
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() isFavoriteRemovable : any ;
  @Input() deletable:any ;
  @Input() isAdmin: any;
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();

  routes = ROUTES;


  constructor(
    public listingService : ListingService ,
    private authService : AuthService ,
    public favoriteService : FavoriteService,
    public sweet : SweetAlertService
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

  }
}
