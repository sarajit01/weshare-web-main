import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../services/snackbar.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  progress: boolean = false
  status: string = "unseen"
  notifications: any = {
    data: [],
    next_page: 1
  }
  constructor(
      private notificationService: NotificationService,
      private snackbarService: SnackbarService,
      private bottomSheet: MatBottomSheet,
      protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getNotifications()
  }


  async getNotifications() {
    try {
      this.progress = true ;
      const resp = await this.notificationService.getNotifications(this.authService.getUserID(), this.notifications.next_page).toPromise();
      console.log(resp);
      if (resp.data){
        this.notifications.data = resp.data;
        this.notifications.next_page = this.notifications.next_page + 1
      }
    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }

  onNotificationTap(notification: any){
    // if (this.authService.getRole() === 'business') {
    //   this.bottomSheet.open(AppointmentActionsBottomSheetComponent, {
    //     data: {
    //       appointment: appointment
    //     }
    //   }).afterDismissed().subscribe((data: any) => {
    //     if (data) {
    //       this.getAppointments();
    //     }
    //     console.log(data);
    //   });
    // }
  }


}
