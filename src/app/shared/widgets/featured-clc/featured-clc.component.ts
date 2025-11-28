import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharePopupComponent} from "../../share-popup/share-popup.component";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'app-featured-clc',
  templateUrl: './featured-clc.component.html',
  styleUrls: ['./featured-clc.component.css']
})
export class FeaturedCLCComponent implements OnInit, AfterViewInit {

  @Output() lcClicked = new EventEmitter<any>()
  @Input() lc: any
  @Output() onVisibility = new EventEmitter<boolean>()
  @Input() displayMode: string = "rewards"
  @Input() checkCompletedVisits: boolean = false
  constructor(
      private bottomSheet: MatBottomSheet,
      private authService: AuthService,
      private listingService: ListingService,
      private overlay: Overlay
  ) { }

  isVisibleInViewPort: boolean = false

  ngOnInit(): void {
    // this.subscribeToIntersecting()
  }

    protected readonly Array = Array;
    protected readonly parseInt = parseInt;




  async saveToFavorites(lc: any) {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
          'Please login !',
          'Please login as customer to add to your favorites list !',
          'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(lc.id, 'loyalty_card', lc.business.main_category_id, this.authService.getUserID(), '').toPromise();
        console.log(resp);
        if (resp.success) {
          Swal.fire(
              resp.success,
              'The Loyalty card is now in your favorites list ! you will get notifications for this LC!',
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

  openSharePopup(lc: any) {
    this.bottomSheet.open( SharePopupComponent, {
      data: {
        listing: lc,
        listing_id : lc.id,
        listing_type: 'lc'
      },
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',
    })

  }

  ngAfterViewInit(): void {
    console.log(`View init ${this.lc.id}`)
  }

  viewDetails(){
    this.lcClicked.emit(this.lc)
  }

}
