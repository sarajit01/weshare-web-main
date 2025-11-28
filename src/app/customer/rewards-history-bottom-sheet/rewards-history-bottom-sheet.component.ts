import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {FavoriteService} from "../../services/favorite.service";
import {Router} from "@angular/router";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-rewards-history-bottom-sheet',
  templateUrl: './rewards-history-bottom-sheet.component.html',
  styleUrls: ['./rewards-history-bottom-sheet.component.css']
})
export class RewardsHistoryBottomSheetComponent implements OnInit {

  business: any
  promotion: any
  loyalty_card: any
  rewards_history: any = []
  favorite: any
  viewMode: string = "details"
  optionsExpanded = true
  visitArray: any
  visits: any = []
  progress = false
  user: any
  activeTab: string = "Prizes"
  tabs: string[] = [] ;


  constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<RewardsHistoryBottomSheetComponent>,
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet,
      private dialog: MatDialog,
      private snackbar: SnackbarService,
      private favoriteService: FavoriteService,
      private listingService: ListingService,
      private router: Router
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(): void {
    this.business = this.data.business
    if (this.data.loyalty_card){
      this.loyalty_card = this.data.loyalty_card;

      if (this.loyalty_card.card_type === "prize"){
        this.tabs = [
            "Prizes", "My Visits"
        ]

        this.getVisitsHistory();
      } else {
        this.tabs = [
           "Prizes", "My Transactions"
        ]

        this.getRewardHistory();
      }
      console.log('LC', this.data.loyalty_card);

    } else {
      this.tabs = [
          "My Transactions"
      ]
      this.activeTab = "My Transactions"

      this.getRewardHistory();
    }

  }

  async getRewardHistory() {
    try {
      this.progress = true ;
      const resp = await this.listingService.getRewardHistory(this.authService.getUserID(), this.business?.id, this.data.loyalty_card?.id,  this.data.reward_type).toPromise();
      console.log(resp);

      if (resp.rewards_history) {
        this.rewards_history = resp.rewards_history ;
      }
      if(resp.user){
        this.user = resp.user
        if (this.user.points !== null && this.user.points !== undefined) {
          this.user.points = this.user.points.toFixed(2);
        }

        if (this.data.loyalty_card.rewards && this.data.loyalty_card.rewards.length > 0) {
          this.data.loyalty_card.rewards.forEach((reward: any) => {
            if (this.user.points && this.user.points > 0 && reward.points !== null && reward.points > 0){
              reward.progress_bar_width = ((this.user.points/reward.points) * 100).toFixed(2)
              if (reward.progress_bar_width > 100){
                reward.progress_bar_width = 100 ;
              }
            } else {
              reward.progress_bar_width = 0 ;
            }

          })
        }

      }
      if (resp.error) {
        this.snackbar.openSnackBar(resp.error);
      }

    } catch ($exception: any) {
      this.snackbar.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }

  async getVisitsHistory() {
    try {
      this.progress = true ;
      const resp = await this.listingService.getVisitsByLC(this.authService.getUserID(), this.loyalty_card?.id).toPromise();
      console.log(resp);

      if (resp.visits) {
        this.visits = resp.visits ;
      }

      if (resp.error) {
        this.snackbar.openSnackBar(resp.error);
      }

    } catch ($exception: any) {
      this.snackbar.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }



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

  closePopup(){
    this._bottomSheet.dismiss(true);
  }


  setActiveTab(tab: string) {
    this.activeTab = tab
  }
}
