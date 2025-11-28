import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";

export interface Vegetable {
  name: string;
}


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  public promotions: any = {
    featured : [] ,
    trending: [] ,
    popular: []
  }

  constructor(
    private listingService : ListingService

  ) { }

  ngOnInit(): void {
    this.getFeaturedListings('promotion', 'featured');
    this.getFeaturedListings('promotion', 'trending');
    this.getFeaturedListings('promotion', 'popular');
  }

  async getFeaturedListings(listingType: string, featuredType: string) {
    try {
      const resp = await this.listingService.getFeaturedListings(listingType, featuredType).toPromise();
      console.log(resp);
      if (resp.featured_listings) {
        if(featuredType === 'trending'){
          this.promotions.trending = resp.featured_listings;
        }
        if(featuredType === 'featured'){
          this.promotions.featured = resp.featured_listings;
        }
        if(featuredType === 'popular'){
          this.promotions.popular = resp.featured_listings;
        }
      }
    } catch ($ex) {
    }
  }


}
