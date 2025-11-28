import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ROUTES} from "../../../core/routes";
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {FavoriteService} from "../../../services/favorite.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-promotion-horizontal',
  templateUrl: './promotion-horizontal.component.html',
  styleUrls: ['./promotion-horizontal.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PromotionHorizontalComponent),
      multi: true,
    }
  ]
})
export class PromotionHorizontalComponent implements ControlValueAccessor {


  @Input() promotion:any ;
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() isFavoriteRemovable : any ;
  @Input() deletable:any ;
  @Input() isAdmin: any;
  routes = ROUTES;


  constructor(
    public listingService : ListingService ,
    private authService : AuthService ,
    public favoriteService : FavoriteService
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
}
