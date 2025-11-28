import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharePopupComponent} from "../../share-popup/share-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DeviceService} from "../../../services/device.service";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {
  RewardsHistoryBottomSheetComponent
} from "../../../customer/rewards-history-bottom-sheet/rewards-history-bottom-sheet.component";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'app-featured-businesses-carousel',
  templateUrl: './featured-businesses-carousel.component.html',
  styleUrls: ['./featured-businesses-carousel.component.css']
})
export class FeaturedBusinessesCarouselComponent implements OnInit {

  @Input() businesses: any = []
  @Input() displayEntitiesOnly: boolean = false
  @Input() displayMode: string = "basic"
  @Output() onBusinessSelected = new EventEmitter<any>()
  @Input() transparentBg: boolean = false

  carouselId: any = crypto.randomUUID();
  constructor(
      private bottomSheet: MatBottomSheet,
      private authService: AuthService,
      private listingService: ListingService,
      public deviceService: DeviceService,
      private overlay: Overlay
  ) { }

  ngOnInit(): void {
  }

  async saveToFavorites(business: any) {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
          'Please login !',
          'Please login as customer to add any business or promotion to your favorites list !',
          'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(business.id, 'business', business.main_category_id, this.authService.getUserID(), '').toPromise();
        console.log(resp);
        if (resp.success) {
          Swal.fire(
              resp.success,
              'The business is now in your favorites list ! you will get notifications for this business !',
              'success'
          );
        }

        if (resp.error) {
          Swal.fire(
              'Failed',
              'Unable to add to your favorites list !',
              'warning'
          )
        }


      } catch ($ex) {

        console.log($ex);
        Swal.fire(
            'Failed',
            'Something went wrong !',
            'warning'
        )

      }
    }

  };

  openSharePopup(business: any) {
    this.bottomSheet.open( SharePopupComponent, {
      data: {
        listing: business,
        listing_id : business.id,
        listing_type: 'business'
      },
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',
    })

  }

  activeSlideIndex: number = 0

  onCarouselScroll($event: any) {
    // console.log(`Scrolling`);
    // console.log($event.srcElement.scrollLeft);
    // console.log($event.srcElement.clientWidth);
    //
    // var scrollPosition = $event.srcElement.scrollLeft;
    //
    // var element = document.getElementsByClassName('featured-carousel-item');
    // if (element[0]){
    //   var itemWidth = element[0].getBoundingClientRect().width
    //   console.log(element[0].getBoundingClientRect().width)
    //   var totalWidth = itemWidth * this.businesses.length
    //   console.log(totalWidth);
    //
    //   if (itemWidth > 0 && scrollPosition > 0){
    //     var currentItem = scrollPosition / itemWidth
    //     console.log(currentItem);
    //     this.activeSlideIndex = Math.round(currentItem);
    //     console.log(this.activeSlideIndex);
    //
    //   } else {
    //     this.activeSlideIndex = 0
    //   }

    // }

    this.activeSlideIndex = this.deviceService.onCarouselScroll($event, this.businesses, 'featured-carousel-item-business');

  }

  onItemClick(favorite: any){
    if (this.displayMode === 'rewards'){
      if (favorite) {
        this.openBottomSheet(favorite)
      }
    }
  }

  viewRewardsHistory(business: any) {
    let data: any = {
      business: business
    };

    data.reward_type = "Points"
    this.bottomSheet.open(RewardsHistoryBottomSheetComponent, {
      data: data
    });
  }


  openBottomSheet(favorite: any): void {
    this.bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        favorite: favorite
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  viewDetails(business: any) {
    this.onBusinessSelected.emit(business);
  }

  onForwarded(){
    var element = document.getElementById('carousel-' + this.carouselId)
    element?.scrollBy({
      left:  240,
      behavior: 'smooth'
    })
  }

  onBack(){
    // @ts-ignore
    var element = document.getElementById('carousel-' + this.carouselId)
    element?.scrollBy({
      left:  -240,
      behavior: 'smooth'
    })
  }
}
