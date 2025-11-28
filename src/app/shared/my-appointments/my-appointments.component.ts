import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";
import {AppointmentService} from "../../services/appointment.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  BusinessDetailOptionsPopupComponent
} from "../../business/business-detail-options-popup/business-detail-options-popup.component";
import {
  AppointmentActionsBottomSheetComponent
} from "./appointment-actions-bottom-sheet/appointment-actions-bottom-sheet.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {

  calendarBottomSheetState: string = "expanded"
  selectedDate: any ;
  selectedDateFormatted: any
  progress: boolean = false
  status: string = "pending"
  date_string: string | undefined
  isCurrentDate: boolean = false
  appointments: any = []
  constructor(
      private appointmentService: AppointmentService,
      private snackbarService: SnackbarService,
      private bottomSheet: MatBottomSheet,
      protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setToday()
  }

  setToday(){
    this.setDate(new Date(), true)
  }

  changeCalendarBottomSheetState(state: string){
    this.calendarBottomSheetState = state
  }

  setDate(date: any, isCurrentDate: boolean = false){
    const format = 'YYYY-MM-dd';
    const locale = 'en-US';
    this.selectedDate = date
    this.selectedDateFormatted = formatDate(date, format, locale);
    console.log(this.selectedDateFormatted);
    this.isCurrentDate = isCurrentDate;
    this.getAppointments();
  }

  onDateChanged($event: any) {
    console.log('Date selected', $event);
    this.setDate($event);

  }

  onStatusChange(status: string){
    console.log(this.selectedDate)
    this.status = status;
    this.setDate(this.selectedDate)
    this.getAppointments();
  }


  async getAppointments() {
    try {
      this.progress = true ;
      const resp = await this.appointmentService.myAppointments(this.selectedDateFormatted, this.status ).toPromise();
      console.log(resp);
      if (resp.date_string){
        this.date_string = resp.date_string;
      }
      if (resp.appointments){
        this.appointments = resp.appointments
      }


    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

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
          this.changeCalendarBottomSheetState('expanded')
        } else { /* down swipe */
          console.log('Down!');
          switch (this.calendarBottomSheetState) {
            case 'expanded' : {
              this.changeCalendarBottomSheetState('collapsed');
              break
            }
            case 'collapsed' : {
              this.changeCalendarBottomSheetState('hidden');
              break
            }
          }
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };

  onAppointmentTap(appointment: any){
    if (this.authService.getRole() === 'business') {
      this.bottomSheet.open(AppointmentActionsBottomSheetComponent, {
        data: {
          appointment: appointment
        }
      }).afterDismissed().subscribe((data: any) => {
        if (data) {
          this.getAppointments();
        }
        console.log(data);
      });
    }
  }

}
