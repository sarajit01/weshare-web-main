import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../../services/listing.service";

@Component({
  selector: 'app-recent-businesses',
  templateUrl: './recent-businesses.component.html',
  styleUrls: ['./recent-businesses.component.css']
})
export class RecentBusinessesComponent implements OnInit {
  businesses: any = [];

  constructor(
    private _listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.getBusinessListings();
  }

  async getBusinessListings() {
    try {
      const resp = await this._listingService.getListing('business', '','').toPromise();
      console.log(resp);
      if (resp.data) {
        this.businesses = resp.data;
        console.log(this.businesses);
      }
    } catch ($ex) {
    }
  }

}
