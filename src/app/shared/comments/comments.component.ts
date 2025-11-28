import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {FavoriteService} from "../../services/favorite.service";
import {Router} from "@angular/router";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any = []
  constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<CommentsComponent>,
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet,
      private dialog: MatDialog,
      private snackbar: SnackbarService,
      private favoriteService: FavoriteService,
      private router: Router,
      private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  closePopup(){
    this._bottomSheet.dismiss(true);
  }

  async getComments() {
    try {
      const resp = await this.listingService.getComments(this.data.listingType, this.data.listing.id, 'listing', 1).toPromise();
      console.log(resp);
      if (resp.data) {
        this.comments = this.comments.concat(resp.data);
      }
    } catch ($ex) {
      console.log($ex);
    }
  };


  xDown = null;
  yDown = null;
  handleTouchStart(evt: any) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };
  handleTouchMove(evt: any) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;
    if(Math.abs( xDiff )+Math.abs( yDiff )> 20){ //to deal with to short swipes

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */
          console.log('left!');
        } else {/* right swipe */
          console.log('right!');
        }
      } else {
        if ( yDiff > 0 ) {/* up swipe */
          console.log('Up!');
        } else { /* down swipe */
          console.log('Down!');
          this._bottomSheet.dismiss()
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };



}
