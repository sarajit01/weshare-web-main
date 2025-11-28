import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {
  FavoriteBusinessBottomSheetComponent
} from "../favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {

  favorites : any = [] ;
  similars : any = [] ;
  user: any = null

  constructor(
    private listingService : ListingService ,
    private authService : AuthService,
    private _bottomSheet: MatBottomSheet,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFavorites();
    this.getFavorites('business');
    // this.getFavorites('promotion');
  }

  openBusinessBottomSheet(business: any): void {
    this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        business: business
      }
    });
  }


  async getAllFavorites() {

    const userId = this.authService.getUserID() ;

    try {
      const resp = await this.listingService.getAllFavorites(userId).toPromise();
      console.log("Favorites response")
      console.log(resp);
      if(resp.user){
        this.user = resp.user ;
      }

    } catch ($ex) {
      console.log($ex);

    }

  }


  async getFavorites(listing_type: string) {
    const userId = this.authService.getUserID() ;
    try {
      const resp = await this.listingService.getFavorites( listing_type, userId).toPromise();
      console.log(resp);
      if(resp.favorites){
        this.favorites = resp.favorites ;
      }

      if(resp.similars){
        this.similars = resp.similars ;
      }

      console.log(resp);

      } catch ($ex) {
        console.log($ex);

      }

  }


  backPrev(){
    this.router.navigate(['/']);
  }



}
