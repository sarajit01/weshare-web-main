import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-edit-business-notification',
  templateUrl: './edit-business-notification.component.html',
  styleUrls: ['./edit-business-notification.component.css']
})
export class EditBusinessNotificationComponent implements OnInit {

  businessNotification: any ;
  progress = false;

  constructor(
    private listingService: ListingService ,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getBusinessNotification(paramMap.get('id') || '');
    })
  }


  async getBusinessNotification(businessNotificationId: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessNotification(businessNotificationId).toPromise();
      console.log(resp);

      if (resp.id) {
        this.businessNotification = resp ;
      } else {
        this.snackbarService.openSnackBar("Failed to get notification");
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }



}
