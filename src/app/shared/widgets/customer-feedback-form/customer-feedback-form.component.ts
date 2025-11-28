import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-customer-feedback-form',
  templateUrl: './customer-feedback-form.component.html',
  styleUrls: ['./customer-feedback-form.component.css']
})
export class CustomerFeedbackFormComponent implements OnInit {

  @Input() listingId: any = null;
  @Input() listingType: any = null;
  @Input() feedbackFormOpen = false ;
  progress = false;
  quality_rating = 0;
  location_rating = 0;
  service_rating = 0;
  price_rating = 0;
  rating = 0;



  feedbackForm = this.fb.group({
    listing_id: this.listingId,
    listing_type: this.listingType ,
    customer_id : this.authService.getUserID() ,
    quality_rating :  [ this.quality_rating, [ Validators.required]] ,
    location_rating :  [ this.location_rating, [ Validators.required]] ,
    service_rating :  [ this.service_rating, [ Validators.required]] ,
    price_rating :  [ this.price_rating, [ Validators.required]] ,
    rating : [ this.rating] ,
    customer_comment: [ '' , Validators.required]
  });


  constructor(
    private fb : UntypedFormBuilder ,
    private authService: AuthService,
    private listingService: ListingService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async submitFeedback() {
    if (!this.feedbackForm.valid) {
      return;
    }
    if (this.feedbackForm.controls.quality_rating.value === 0) {
      this.snackbarService.openSnackBar('Please rate about quality for the listing');
      return;
    }
    if (this.feedbackForm.controls.service_rating.value === 0) {
      this.snackbarService.openSnackBar('Please fill all the fields to submit the review');
      return;
    }

    if (this.feedbackForm.controls.price_rating.value === 0) {
      this.snackbarService.openSnackBar('Please fill all the fields to submit the review');
      return;
    }

    if (this.feedbackForm.controls.location_rating.value === 0) {
      this.snackbarService.openSnackBar('Please fill all the fields to submit the review');
      return;
    }


    this.feedbackForm.controls.listing_id.setValue(this.listingId);
    this.feedbackForm.controls.listing_type.setValue(this.listingType);
    if (!this.feedbackForm.controls.customer_id.value) {
      this.sweet.errorNotification('Require authentication', 'Please login as customer to submit a feedback');

      return;
    }
    try {
      this.progress = true;
      const resp = await this.listingService.saveReview(this.feedbackForm.value).toPromise();
      console.log(resp);

      if (resp.success) {
        this.sweet.successNotification('Feedback submitted successfully', resp.success);
        setTimeout(() =>{
          window.location.reload();
        } , 3000);

      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to submit feedback', resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }


  }


}
