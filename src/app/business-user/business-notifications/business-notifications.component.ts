import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-business-notifications',
  templateUrl: './business-notifications.component.html',
  styleUrls: ['./business-notifications.component.css']
})
export class BusinessNotificationsComponent implements OnInit {

  routes = ROUTES;
  search: any = '';
  business_notifications: any[] = [] ;

  constructor(
    private _listingService: ListingService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getBusinessNotifications();
  }

  async getBusinessNotifications() {
    try {
      const resp = await this._listingService.getUserBusinessNotifications(this._authService.getUserID(), this.search).toPromise();
      console.log(resp);
      if (resp.user_business_notifications) {
        this.business_notifications = resp.user_business_notifications;
        console.log(this.business_notifications);
      }

    } catch ($ex) {

    }

  }




}
