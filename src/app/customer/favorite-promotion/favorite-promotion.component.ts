import {Component, Input, OnInit} from '@angular/core';
import {
  FavoriteBusinessBottomSheetComponent
} from "../favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {AuthService} from "../../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-favorite-promotion',
  templateUrl: './favorite-promotion.component.html',
  styleUrls: ['./favorite-promotion.component.css']
})
export class FavoritePromotionComponent implements OnInit {

  @Input() favorite: any
  gallery: any
  constructor(
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    if(this.favorite.promotion && this.favorite.promotion.business){
      if(this.favorite.promotion.gallery && this.favorite.promotion.gallery[0]){
        this.gallery = this.favorite.promotion.gallery ;
      } else {
        this.gallery = this.favorite.promotion.business.gallery ;
      }
      this.favorite.promotion.gallery = this.gallery
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        favorite: this.favorite
      }
    });
  }



}
