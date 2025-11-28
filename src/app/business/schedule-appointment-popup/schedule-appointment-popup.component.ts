import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Step} from "../../models/Step";
import {AppointmentService} from "../../services/appointment.service";
import {SnackbarService} from "../../services/snackbar.service";
import {formatDate} from "@angular/common";
import {AppointmentBookingRequest} from "../../models/Appointment";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-schedule-appointment-popup',
  templateUrl: './schedule-appointment-popup.component.html',
  styleUrls: ['./schedule-appointment-popup.component.css']
})
export class ScheduleAppointmentPopupComponent implements OnInit {

  steps: Step[] = [{name: "Select Services"},{name: "Select Schedule"},{name: "Confirmation"}] ;
  activeStep: number = 0 ;
  servicesSelected: number[] = [] ;
  services: any = []
  selectedDate: any ;
  isLoading: boolean = false
  serviceToSelectCollaborator: any
  collaboratorInViewIndex: number = 0
  appointments: AppointmentBookingRequest | undefined
  formCustomerInfo = this.fb.group({
    customer_id : [ this.authService.getUserID(), [Validators.required]] ,
    business_id :  [ this.data.business.id, [ Validators.required]] ,
    customer_name :  [ '', [ Validators.required]] ,
    customer_email :  [ '', [ Validators.required]] ,
    customer_phone :  [ '' , [ Validators.required]] ,
    customer_notes :  [ '' , [ Validators.required]] ,
    appointments :  [ [] ] ,
  });
  constructor(
      private fb: UntypedFormBuilder,
      private _bottomSheet: MatBottomSheet,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<ScheduleAppointmentPopupComponent>,
      private appointmentService: AppointmentService,
      private snackbarService: SnackbarService,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setDate(new Date())
  }

  setDate(date: any){
    const format = 'YYYY-MM-dd';
    const locale = 'en-US';
    this.selectedDate = formatDate(date, format, locale);
  }

  closePopup(){
    this._bottomSheet.dismiss(true);
  }

  onServiceAssignable(service: any){
    this.serviceToSelectCollaborator = service
  }

  toggleSelection(service_id: number){
    let index = this.servicesSelected.indexOf(service_id);
    if (index > -1){
      this.servicesSelected.splice(index, 1);
    } else {
      this.servicesSelected.push(service_id);
    }
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


  async getAvailableCollaborators() {
    if (!this.servicesSelected.length) {
      this.snackbarService.openSnackBar("Please select at least one service to schedule an appointment");
      return
    }
    this.activeStep = 1;
    try {
      this.isLoading = true
      console.log('Selected date', this.selectedDate);
      let resp = await this.appointmentService.getAvailableCollaborators({services: this.servicesSelected, date: this.selectedDate }).toPromise();
      console.log(resp);
      if (resp.length){
        this.services = resp;
      }

    } catch (ex) {
      console.log(ex);
    } finally {
      this.isLoading = false
    }

  }

  async nextStep() {
    if (this.activeStep === 0) {
      this.getAvailableCollaborators();
      return;
    }
    if (this.activeStep === 1) {
      let filter = this.services.filter((service: any) => service.selected_user !== null && service.selected_time !== null);
      if (filter[0]) {
        this.activeStep = 2;
      } else {
        this.snackbarService.openSnackBar("Please select collaborator for the selected services to schedule an appointment")
      }
      return;
    }
    if (this.activeStep === 2) {
      if (!this.formCustomerInfo.valid) {
        console.log('Form invalid');
        this.formCustomerInfo.markAllAsTouched();
      } else {
        let appointmentsToBook: any = [];
        await this.services.forEach((service: any) => {
          let appointmentToBook = {
            service_id: service.service.id,
            listing_id: this.data.business.id,
            listing_type: 'business',
            business_id: this.data.business_id,
            business_user_id: service.selected_user.business_user_id,
            date: this.selectedDate,
            start_time: service.selected_time
          }
          appointmentsToBook.push(appointmentToBook);
        });

        this.formCustomerInfo.controls.appointments.setValue(appointmentsToBook);
       // console.log(this.formCustomerInfo.value);

        try {
          this.isLoading = true
          let resp = await this.appointmentService.bookAppointments(this.formCustomerInfo.value).toPromise()
          if (resp.error){
            this.snackbarService.openSnackBar(resp.error);
          }
          if (resp.success){
            this.snackbarService.openSnackBar(resp.success);
            this.closePopup();
          }
        } catch (ex){
          // @ts-ignore
          this.snackbarService.openSnackBar(`Failed to confirm appointment ${ex.message}`)
        } finally {
          this.isLoading = false
        }

      }
    }
  }

  onDateChanged($event: any) {
    console.log('Date selected', $event);
    this.setDate($event);
    this.getAvailableCollaborators();
  }

  prevStep() {
    if (this.activeStep > 0){
      this.activeStep = this.activeStep - 1
    }
  }

  prevCollab(){
    if (this.collaboratorInViewIndex > 0){
      this.collaboratorInViewIndex = this.collaboratorInViewIndex - 1 ;
    }
  }

  nextCollab(){
    if (this.serviceToSelectCollaborator.available_users.length > (this.collaboratorInViewIndex + 1)){
      this.collaboratorInViewIndex = this.collaboratorInViewIndex + 1 ;
    }
  }

  closeAssignable() {
    this.serviceToSelectCollaborator = null
  }

  selectTime(time: string){
    this.serviceToSelectCollaborator.selected_time = time ;
  }


  acceptCollaborator(){
    if (!this.serviceToSelectCollaborator.selected_time){
      this.snackbarService.openSnackBar("Please select a time");
      return;
    }
    this.serviceToSelectCollaborator.selected_user = this.serviceToSelectCollaborator.available_users[this.collaboratorInViewIndex];
    let serviceSearch = this.services.findIndex((service: any) => service.service.id.toString() === this.serviceToSelectCollaborator.service.id.toString());
    if (serviceSearch > -1){
      this.services[serviceSearch] = this.serviceToSelectCollaborator;
    }
    this.serviceToSelectCollaborator = null;
    console.log(this.services);
  }

  confirmRequest(){

  }
}
