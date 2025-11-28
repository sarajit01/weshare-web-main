import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {

  listingType: string = ""
  listings: any = []

  constructor(
      private listingService : ListingService ,
      private authService : AuthService,
      private _bottomSheet: MatBottomSheet,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.listingType = param["listing_type"];
      this.getMyListings(this.listingType);
    })
  }

  backPrev(){
    this.router.navigate(['/customer/dashboard']);
  }

  async getMyListings(listing_type: string) {

    const userId = this.authService.getUserID() ;

    try {
      const resp = await this.listingService.getListing( listing_type, userId).toPromise();
      console.log(resp);
      if(resp.data){
        this.listings = resp.data ;
      }
      console.log('My Listings from API response')
      console.log(resp);

    } catch ($ex) {
      console.log($ex);

    }

  }


}
