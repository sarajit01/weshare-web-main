import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {


  businesses : any = {
    trending: [] ,
    featured: [] ,
    popular: []
  };
  categories: any = [];

  constructor(private _listingService: ListingService , private catService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getFeaturedListings('business', 'featured');
    this.getFeaturedListings('business', 'trending');
    this.getFeaturedListings('business', 'popular');

  }

  async getBusinessListings() {

    try {

      const resp = await this._listingService.getListing('business','','').toPromise();
      console.log(resp);
      if(resp.data){

        this.businesses = resp.data ;
        console.log(this.businesses);
      }

    } catch ($ex) {

    }

  }

  async getFeaturedListings(listingType: string, featuredType: string) {
    try {
      const resp = await this._listingService.getFeaturedListings(listingType, featuredType).toPromise();
      console.log(resp);
      if (resp.featured_listings) {
        if(featuredType === 'trending'){
          this.businesses.trending = resp.featured_listings;
        }
        if(featuredType === 'featured'){
          this.businesses.featured = resp.featured_listings;
        }
        if(featuredType === 'popular'){
          this.businesses.popular = resp.featured_listings;
        }
      }
    } catch ($ex) {
    }
  }

  async getCategories() {

    const resp = await this.catService.getCategories('').toPromise();

    console.log(resp);

    let key = 0 ;
    let inserted = 0 ;

    resp.forEach((currentValue: any, index: any) => {
      if(this.categories[key] === undefined) {
        this.categories[key] = [];
        inserted = 0;
      }
      inserted++ ;
      if(inserted <= 6){
        this.categories[key].push(currentValue);

      }

    });


    //  this.categoryOptions = resp ;


  }


}
