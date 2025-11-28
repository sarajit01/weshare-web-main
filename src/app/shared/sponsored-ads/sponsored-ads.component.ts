import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-sponsored-ads',
  templateUrl: './sponsored-ads.component.html',
  styleUrls: ['./sponsored-ads.component.css']
})
export class SponsoredAdsComponent implements OnInit {

  ads: any = []
  constructor(
      private _listingService: ListingService,
  ) { }

  ngOnInit(): void {
    this.getRandomAds();
  }

  async getRandomAds() {
    try {
      const resp = await this._listingService.getRandomAds().toPromise();
      console.log("Ads sponsored", resp);
      if (resp.ads) {
        this.ads = resp.ads;
      }

    } catch (ex){
      console.log('Sponsored ads fetch error', ex);
    }

  }

}
