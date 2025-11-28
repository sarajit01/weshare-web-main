import {Component, Input, OnInit} from '@angular/core';
import {
  ScheduleAppointmentPopupComponent
} from "../../../business/schedule-appointment-popup/schedule-appointment-popup.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ShareService} from "../../../services/share.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SharePopupComponent} from "../../share-popup/share-popup.component";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'app-business-bottom-toolbar',
  templateUrl: './business-bottom-toolbar.component.html',
  styleUrls: ['./business-bottom-toolbar.component.css']
})
export class BusinessBottomToolbarComponent implements OnInit {

  @Input() listing: any
  @Input() listingType: string = 'business'
  protected activeItem: string = 'favorite'
  shared_token: any;


  constructor(
      private _bottomSheet: MatBottomSheet,
      private _authService: AuthService,
      private _listingService: ListingService,
      private route: ActivatedRoute ,
      private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.shared_token = paramMap.get('shared_token') || '';
    });
  }

  scrollToSection(sectionId: string) {
    this.activeItem = 'contact'

    if (this.listingType === 'lc' && sectionId === 'contact'){
      sectionId = 'contact-form'
    }
    // @ts-ignore
   document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  }

  scheduleAppointment(){
    this.activeItem = 'appointment'
    let data = {
      business: this.listing
    }
    console.log(data);
    this._bottomSheet.open( ScheduleAppointmentPopupComponent, {
      data:  data
    },

    );
  }


  onSharePrepare(){
    this.activeItem = 'share'
    switch (this.listingType){
      case "ad" :

        this.openSharePopup(this.listing.business, this.listing.business_id, 'business')
        break;

      default:

        this.openSharePopup(this.listing, this.listing.id, this.listingType)


    }
  }

  openSharePopup(listing: any, listingId: any, listingType: any) {
    //   this.bsService.displayPopup(this.viewContainerRef, {
    //     listing: this.listing,
    //     listing_id : this.listing.id,
    //     listing_type: this.listingType
    //   } )
    // //  this.viewContainerRef.createComponent(BSPopupComponent)

    this._bottomSheet.open(SharePopupComponent, {
      data:  {
        listing: listing,
        listing_id : listingId,
        listing_type: listingType
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',
    });

  }




  whatsAppCall() {
    this.activeItem = 'whatsapp'
   // let phoneNum = document.getElementById('business-phone')?.innerText
    if (this.listing.contacts && this.listing.contacts.business_phone) {
      window.location.href = 'https://wa.me/'+ this.listing.contacts.business_phone;
    } else {
      alert('The business has not added their phone number to call');
    }
  }

  async saveToFavorites() {

    if(! this._authService.isLoggedIn()){
      Swal.fire(
          'Please login !',
          'Please login as customer to add any business or promotion to your favorites list !',
          'warning'
      )
    } else {

      try {

        if(this.listingType == "business") {
          const resp = await this._listingService.addToFavorites(this.listing.id, this.listingType, this.listing.main_category_id, this._authService.getUserID(), this.shared_token).toPromise();
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

        }
        if(this.listingType === "promotion"){
          const resp = await this._listingService.addToFavorites(this.listing.id, 'promotion', this.listing.business?.main_category_id, this._authService.getUserID(), this.shared_token).toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The promotion is now in your favorites list ! you will get notifications for this promotion !',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                resp.error,
                'warning'
            )
          }


        }

        if(this.listingType === "loyalty_card" || this.listingType === "lc" || this.listingType === "tcf"){
          const resp = await this._listingService.addToFavorites(this.listing.id, 'loyalty_card', this.listing.business?.main_category_id, this._authService.getUserID(), '').toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The LC is now in your favorites list ! you will get notifications for this LC!',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                resp.error,
                'warning'
            )
          }
        }

        if(this.listingType === "ad" || this.listingType === "business_ad"){
          const resp = await this._listingService.addToFavorites(this.listing.business_id, 'business', this.listing.business?.main_category_id, this._authService.getUserID(), '').toPromise();
          console.log(resp);
          if (resp.success) {
            Swal.fire(
                resp.success,
                'The Business is now in your favorites list ! you will get notifications for this Business!',
                'success'
            );
          }

          if (resp.error) {
            Swal.fire(
                'Failed',
                resp.error,
                'warning'
            )
          }
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
}
