import {Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {PlanService} from "../../../services/plan.service";


@Component({
  selector: 'app-business-featured-widget',
  templateUrl: './business-featured-widget.component.html',
  styleUrls: ['./business-featured-widget.component.css'] ,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessFeaturedWidgetComponent),
      multi: true,
    }
  ]
})
export class BusinessFeaturedWidgetComponent implements ControlValueAccessor {

  @Input() business:any ;
  @Input() isOwner:any ;
  @Input() isFavorite:any ;
  @Input() deletable:any ;

  constructor(
    public listingService : ListingService ,
    private authService : AuthService,
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

  }




}
