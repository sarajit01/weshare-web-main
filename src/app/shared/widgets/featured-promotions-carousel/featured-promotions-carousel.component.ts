import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {SharePopupComponent} from "../../share-popup/share-popup.component";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DeviceService} from "../../../services/device.service";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'app-featured-promotions-carousel',
  templateUrl: './featured-promotions-carousel.component.html',
  styleUrls: ['./featured-promotions-carousel.component.css']
})
export class FeaturedPromotionsCarouselComponent implements OnInit {

  @Output() onPromotionSelected = new EventEmitter<any>()
  @Input() business: any
  @Input() promotions: any = []
  @Input() displayEntitiesOnly: boolean = false
  @Input() displayMode: string = 'basic'
  @Input() transparentBg: boolean = false
  @Input() cornerRadius: number = 0

  carouselId: any = crypto.randomUUID();

  constructor(
      private bottomSheet: MatBottomSheet,
      private authService: AuthService,
      private listingService: ListingService,
      public deviceService: DeviceService,
      private overlay: Overlay
  ) { }

  activeSlideIndex: number = 0 ;

  ngOnInit(): void {
  }

  onItemClick(favorite: any){
    if (this.displayMode === 'rewards'){
      if (favorite) {
        this.openBottomSheet(favorite)
      }
    }
  }


  openBottomSheet(favorite: any): void {
    this.bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        favorite: favorite
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }


  async saveToFavorites(promotion: any) {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
          'Please login !',
          'Please login as customer to add any business or promotion to your favorites list !',
          'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(promotion.id, 'promotion', promotion.business.main_category_id, this.authService.getUserID(), '').toPromise();
        console.log(resp);
        if (resp.success) {
          Swal.fire(
              resp.success,
              'The promotion is now in your favorites list ! you will get notifications for this promotion!',
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

  openSharePopup(promotion: any) {
    this.bottomSheet.open( SharePopupComponent, {
      data: {
        listing: promotion,
        listing_id : promotion.id,
        listing_type: 'promotion'
      },
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',
    });

  }


  onCarouselScroll($event: any) {
    this.activeSlideIndex = this.deviceService.onCarouselScroll($event, this.promotions, 'featured-carousel-item-promo');
  }

    viewPromotion(promotion: any) {
        this.onPromotionSelected.emit(promotion)
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
