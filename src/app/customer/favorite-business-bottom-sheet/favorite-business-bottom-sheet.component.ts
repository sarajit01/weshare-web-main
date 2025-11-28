import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {AuthService} from "../../services/auth.service";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {FavoriteService} from "../../services/favorite.service";
import {Router} from "@angular/router";
import {
  RewardsHistoryBottomSheetComponent
} from "../rewards-history-bottom-sheet/rewards-history-bottom-sheet.component";
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../../components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {PusherService} from "../../services/pusher.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {Overlay} from "@angular/cdk/overlay";
import {QRScanErrorPopupComponent} from "../qrscan-error-popup/qrscan-error-popup.component";

@Component({
  selector: 'app-favorite-business-bottom-sheet',
  templateUrl: './favorite-business-bottom-sheet.component.html',
  styleUrls: ['./favorite-business-bottom-sheet.component.css'],
  animations: [
      trigger('QrCodeCard', [
          state('front' , style({
            // transform: 'rotateY(0deg)'
          })),
          state('back', style({
            // transform: 'rotateY(180deg)'
          })),
        transition('front => back', [
            animate('0.5s', keyframes([
                style({transform: 'rotateY(180deg)'}),
                style({transform: 'rotateY(0deg)'}),
            ])),
        ]),
        transition('back => front', [
          animate('0.5s', keyframes([
            style({transform: 'rotateY(180deg)'}),
            style({transform: 'rotateY(0deg)'}),
          ])),

        ]),

      ])
  ]
})
export class FavoriteBusinessBottomSheetComponent implements OnInit {

  business: any
  promotion: any
  loyalty_card: any
  favorite: any
  viewMode: string = "qr"
  optionsExpanded = true
  visitArray: any
  progress = false
  qrCodeCardState: string = 'back'


  constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<FavoriteBusinessBottomSheetComponent>,
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet,
      private dialog: MatDialog,
      private snackbar: SnackbarService,
      private favoriteService: FavoriteService,
      private router: Router,
      private pusherService: PusherService,
      private overlay: Overlay
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(): void {
    this.favorite = this.data.favorite
    if(this.favorite.listing_type === "business"){
      this.business = this.favorite.business ;
    }
    if(this.favorite.listing_type === "promotion"){
      this.promotion = this.favorite.promotion ;
      this.business = this.promotion.business

      if (!this.promotion.gallery || !this.promotion.gallery.length){
        this.promotion.gallery = this.business.gallery
      }
    }
    if(this.favorite.listing_type === "loyalty_card"){
      this.loyalty_card = this.favorite.loyalty_card ;
      if(this.loyalty_card.card_type === 'prize'){
        this.visitArray = new Array(parseInt(this.loyalty_card.visits_for_cash));
      }
      this.business = this.loyalty_card.business ;
    }

    this.pusherService.channel.bind('lc_visit_' + this.authService.getUserID(), (data: any) => {
      this._bottomSheet.dismiss(false)

    });
    this.pusherService.channel.bind('lc_reward_' + this.authService.getUserID(), (data: any) => {
      this._bottomSheet.dismiss(false)
    });
    this.pusherService.channel.bind('scan_error_' + this.authService.getUserID(), (data: any) => {
    //  this._bottomSheet.dismiss(false);
      this._bottomSheet.open( QRScanErrorPopupComponent, {
        data: data ,
        scrollStrategy: this.overlay.scrollStrategies.noop()
      });
    });

  }

  getQRCodeData(){
    if(this.favorite.listing_type === "business"){
      return this.getQRCodeDataForBusiness();
    }
    if(this.favorite.listing_type === "promotion"){
      return this.getQRCodeDataPromo();
    }
    if(this.favorite.listing_type === "loyalty_card"){
      return this.getQRCodeDataLC();
    }
    return null
  }

  getQRCodeDataForBusiness(){
    let string = 'Listing Type:Business\nID:'+this.business.id+'\nCustomer ID:'+this.authService.getUserID();

    if(this.favorite.referrer_id){
      string = string + '\nReferrer ID:'+this.favorite.referrer_id ;
    }

    return encodeURI(string);
  }

  getQRCodeDataPromo(){
    let string = 'Listing Type:'+this.promotion.promotion_type+' '+this.promotion.code+'\nID:'+this.promotion.id+'\nCustomer ID:'+this.authService.getUserID();

    if(this.favorite.referrer_id){
      string = string + '\nReferrer ID:'+this.favorite.referrer_id ;
    }

    return encodeURI(string);
  }

  getQRCodeDataLC(){
    let string = 'Listing Type:LC\nID:'+this.loyalty_card.id+'\nCustomer ID:'+this.authService.getUserID();
    if(this.favorite.referrer_id){
      string = string + '\nReferrer ID:'+this.favorite.referrer_id ;
    }

    string = string+'\nReward type:'+this.loyalty_card.card_type;

    return encodeURI(string);
  }


  viewQRCode(){
    this.qrCodeCardState = 'back'
    setTimeout(() => {
      this.viewMode = "qr"
    }, 300)
  }

  viewData(){
    this.qrCodeCardState = 'front'
    setTimeout(() => {
      this.viewMode = "details"
    }, 300)
  }

  toggleOptions(){
    this.optionsExpanded = !this.optionsExpanded ;
  }

  closePopup(){
    this._bottomSheet.dismiss(true);
  }

  openSharePopup() {
    var data = {};
    if(this.favorite.listing_type === "loyalty_card") {
      data =  {
        listing: this.loyalty_card,
            listing_id: this.loyalty_card.id,
            listing_type: 'lc',
            progress: this.progress
      };
    }
    if(this.favorite.listing_type === "promotion"){
      data =  {
        listing: this.promotion,
        listing_id : this.promotion.id,
        listing_type: 'promotion'
      }
    }
    if(this.favorite.listing_type === "business"){
      data =  {
        listing: this.business,
        listing_id : this.business.id,
        listing_type: 'business'
      }
    }

    this._bottomSheet.open(SharePopupComponent, {
      data: data ,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',

    });

  }

  viewRewardsHistory(){
    var data: any = {};
    if(this.favorite.listing_type === "loyalty_card") {
      data =  {
        business: this.loyalty_card.business,
        loyalty_card: this.loyalty_card
      };
    }
    if(this.favorite.listing_type === "promotion"){
      data =  {
        business: this.promotion.business
      }
    }
    if(this.favorite.listing_type === "business"){
      data =  {
        business: this.business
      }
    }

    data.reward_type = "Points"
    this._bottomSheet.open( RewardsHistoryBottomSheetComponent, {
      data : data ,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  removeFromFavorites(){
    var conf = confirm('Are you sure to remove the selected item from favorites?');
    if(conf) {
      var listing_type = "business";
      var listing_id = 0;
      if (this.favorite.listing_type === "loyalty_card") {
        listing_id = this.loyalty_card.id;
        listing_type = 'loyalty_card';

      }
      if (this.favorite.listing_type === "promotion") {
        listing_id = this.promotion.id;
        listing_type = 'promotion';
      }
      if (this.favorite.listing_type === "business") {
        listing_id = this.business.id;
        listing_type = 'business';
      }
      this.favoriteService.delete(listing_type, listing_id)
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


    protected readonly Array = Array;
    protected readonly parseInt = parseInt;
}
