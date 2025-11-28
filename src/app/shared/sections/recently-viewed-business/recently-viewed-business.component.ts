import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../../services/listing.service";

@Component({
  selector: 'app-recently-viewed-business',
  templateUrl: './recently-viewed-business.component.html',
  styleUrls: ['./recently-viewed-business.component.css']
})
export class RecentlyViewedBusinessComponent implements OnInit {
  businesses: any = [];

  constructor(
    private _listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.getBusinessListings();
  }

  async getBusinessListings() {
    try {
      const resp = await this._listingService.getRecentlyViewed('business').toPromise();
      console.log(resp);
      if (resp.recently_viewed_listings) {
        this.businesses = resp.recently_viewed_listings;
        console.log(this.businesses);
      }
    } catch ($ex) {
    }
  }

}
