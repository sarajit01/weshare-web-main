import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.css']
})
export class BookingRequestsComponent implements OnInit {
  progress: any = false;
  bookings: any = [] ;

  constructor(
    private fb : UntypedFormBuilder ,
    private authService: AuthService,
    private listingService: ListingService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  viewMessage(message: any){
    this.sweet.successNotification('Additional notes', message);
  }
  async getRequests() {
    try {
      this.progress = true;
      const resp = await this.listingService.getBookingRequests(this.authService.getUserID()).toPromise();
      console.log('booking requests',resp);
      if (resp.bookings) {
          this.bookings = resp.bookings;
      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to load bookings', resp.error);
      }
    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);
    } finally {
      this.progress = false;
    }
  }

  async approveBookingReq(id: any) {
    try {
      this.progress = true;
      const resp = await this.listingService.approveBookingRequest(id).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweet.successNotification('Appointment request approved successfully', resp.success);
        this.getRequests();
      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to approve', resp.error);
      }
    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);
    } finally {
      this.progress = false;
    }
  }

  async deleteBookingReq(id: any) {
    try {
      this.progress = true;
      const resp = await this.listingService.deleteBookingRequest(id).toPromise();
      console.log(resp);
      if (resp.success) {
        this.getRequests();
        this.snackbarService.openSnackBar(resp.success)
      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);
    } finally {
      this.progress = false;
    }
  }

}
