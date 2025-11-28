import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  progress: any = false;
  appointments: any = [] ;

  constructor(
    private fb : UntypedFormBuilder ,
    private authService: AuthService,
    private listingService: ListingService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  viewMessage(message: any){
    this.sweet.successNotification('Additional notes', message);
  }
  async get() {
    try {
      this.progress = true;
      const resp = await this.listingService.getAppointments(this.authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.appointments) {
        this.appointments = resp.appointments;
      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to load appointments', resp.error);
      }
    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);
    } finally {
      this.progress = false;
    }
  }

}
