import {Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {FavoriteService} from "../../../services/favorite.service";
import {ROUTES} from "../../../core/routes";
import {PlanService} from "../../../services/plan.service";

@Component({
  selector: 'business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'] ,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessComponent),
      multi: true,
    }
  ]
})
export class BusinessComponent implements ControlValueAccessor {

  cloneProgress = false ;
  routes = ROUTES;
  @Input() business:any ;
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() deletable:any ;
  @Input() isFavoriteRemovable : any ;
  @Input() isAdmin : any ;
  @Input() delegateRole: any;
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();


  constructor(
    public listingService : ListingService ,
    private authService : AuthService ,
    public favoriteService : FavoriteService,
    public planService: PlanService
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


  async updateBusinessStatus(status: string) {

    try {

      const resp = await this.listingService.updateBusinessStatus(this.business.id , status).toPromise();
      console.log(resp);
      if(resp.success){
        Swal.fire(
          'Status updated',
          resp.success,
          'success'
        );

        setTimeout(() =>{
          window.location.reload();
        } , 2000);

      }

      if(resp.error){
        Swal.fire(
          'Failed',
          'Unable to update status !',
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

    if (!this.authService.isLoggedIn()) {
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


  async cloneBusiness() {
    try {

      this.cloneProgress = true ;
        const resp = await this.listingService.cloneBusiness(this.business.id).toPromise();
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
      this.cloneProgress = false ;
    }

  }

  getDelegateAccess(role: string): boolean{
    if(this.delegateRole === 'business_assistant'){
      return true;
    }
    if(this.delegateRole === role){
      return true;
    }
    return false;
  }


  async addToFeaturedListing(featuredType: string) {
    try {
      const resp = await this.listingService.addFeaturedListings({
        listing_type: 'business',
        listing_id: this.business.id ,
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
