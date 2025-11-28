import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";
import {FavoriteService} from "../../services/favorite.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  search: any = '' ;
  notifications: any = [] ;

  constructor(
    private _authService: AuthService,
    private _listingService: ListingService,
    private _favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {
    this.getBusinessNotifications().then(r => console.log(r));
  }

  async getBusinessNotifications() {
    try {
      const resp = await this._favoriteService.getFavoriteNotifications(this._authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.user_favorite_notifications) {
        this.notifications = resp.user_favorite_notifications;
        console.log(this.notifications);
      }

    } catch ($ex) {

    }

  }

}
