import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  @Input() listingId: any = null;
  @Input() listingType: any = null;
  progress: any = false ;
  @Input() business: any;

  available_times: any = [] ;
  weekDaySelected: any = null;

  bookingForm = this.fb.group({
    service_id: [''],
    business_user_id: [''],
    listing_id: this.listingId ,
    listing_type: this.listingType ,
    weekday: '',
    user_id : this.authService.getUserID() ,
    date:  [ '' ,[ Validators.required]] ,
    time_from :  [ '' ,[ Validators.required]] ,
    customer_name :  [ '', [ Validators.required]] ,
    customer_email :  [ '', [ Validators.required]] ,
    customer_phone :  [ '', [ Validators.required]] ,
    guests :  [ '1'] ,
    notes: [ '' , Validators.required]
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
  async submitBookingRequest() {
    if (!this.bookingForm.valid) {
      return;
    }
  /*  if(this.bookingForm.controls.date_to.value < this.bookingForm.controls.date_from.value){
      this.snackbarService.openSnackBar('Please select valid date');
      return;
    } */
    this.bookingForm.controls.listing_id.setValue(this.listingId);
    this.bookingForm.controls.listing_type.setValue(this.listingType);
    try {
      this.progress = true;
      const resp = await this.listingService.saveBookingRequest(this.bookingForm.value).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweet.successNotification('Booking request submitted', resp.success);
        setTimeout(() =>{
          window.location.reload();
        } , 3000);
      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to submit booking request', resp.error);
      }
    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);
    } finally {
      this.progress = false;
    }
  }

  onDataChange(){
    this.bookingForm.controls.date.setValue(null);
    this.weekDaySelected = null;
    this.available_times = [];
    this.bookingForm.controls.time_from.setValue(null);
  }

  setDate($event: MatDatepickerInputEvent<unknown, unknown | null>) {

    this.bookingForm.controls.time_from.setValue('');

    // @ts-ignore
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // @ts-ignore
    this.weekDaySelected = days[$event.value.getDay()];
    this.bookingForm.controls.weekday.setValue(this.weekDaySelected);
    // @ts-ignore

    if(this.business && this.business.appointment_settings){

      if(!this.bookingForm.controls.service_id.value){
        this.bookingForm.controls.service_id.setValue(null);
      } else {
        console.log('selected service id',  this.bookingForm.controls.service_id.value);
      }
      if(!this.bookingForm.controls.business_user_id.value){
        this.bookingForm.controls.business_user_id.setValue(null);
      }


      let available = this.business.appointment_settings.findIndex((x: any) => {
        if(!this.bookingForm.controls.service_id.value && !this.bookingForm.controls.business_user_id.value){
          if(x.service_id || x.business_user_id){
            return false;
          }
          return  x.day === this.weekDaySelected;
        }
        if(!this.bookingForm.controls.service_id.value && this.bookingForm.controls.business_user_id.value){
          if(x.business_user_id && !x.service_id){
            return  x.day === this.weekDaySelected && x.business_user_id.toString() === this.bookingForm.controls.business_user_id.value.toString();
          }
          return false;
        }
        if(this.bookingForm.controls.service_id.value && !this.bookingForm.controls.business_user_id.value){
          if(x.service_id && !x.business_user_id){
            return  x.day === this.weekDaySelected && x.service_id.toString() === this.bookingForm.controls.service_id.value.toString();
          }
          return false;
        }

        if(this.bookingForm.controls.service_id.value && this.bookingForm.controls.business_user_id.value){
          if(x.service_id && x.business_user_id){
            return  x.day === this.weekDaySelected && x.service_id.toString() === this.bookingForm.controls.service_id.value.toString() && x.business_user_id.toString() === this.bookingForm.controls.business_user_id.value.toString();
          }
          return  false;
        }

        return  x.day === this.weekDaySelected;

      });

      if(available !== -1){
        this.available_times = this.business.appointment_settings[available].available ;
      } else {
        this.available_times = [] ;
      }

    }

  }

  setTime(x: any) {
    this.bookingForm.controls.time_from.setValue(x);
  }
}
