import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ShareService} from "../../../services/share.service";
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {
  ScheduleAppointmentPopupComponent
} from "../../../business/schedule-appointment-popup/schedule-appointment-popup.component";

@Component({
  selector: 'app-promotion-bottom-toolbar',
  templateUrl: './promotion-bottom-toolbar.component.html',
  styleUrls: ['./promotion-bottom-toolbar.component.css']
})
export class PromotionBottomToolbarComponent implements OnInit {


  @Input() business: any
  protected activeItem: string = 'favorite'
  shared_token: any;


  constructor(
      private _bottomSheet: MatBottomSheet,
      private _shareService: ShareService,
      private _authService: AuthService,
      private _listingService: ListingService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.shared_token = paramMap.get('shared_token') || '';
    });
  }

  scrollToSection(sectionId: string) {
    this.activeItem = 'contact'
    // @ts-ignore
    document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  }

  scheduleAppointment(){
    this.activeItem = 'appointment'
    let data = {
      business: this.business

    }
    console.log(data);
    this._bottomSheet.open( ScheduleAppointmentPopupComponent, {
          data:  data
        },

    );
  }

  openSharePopup() {
    this.activeItem = 'share';
    this._shareService.openSharePopup({
      listing: this.business,
      listing_type: 'business'
    })

  }

  whatsAppCall() {
    this.activeItem = 'whatsapp'
    // let phoneNum = document.getElementById('business-phone')?.innerText
    if (this.business.contacts && this.business.contacts.business_phone) {
      window.location.href = 'https://wa.me/'+ this.business.contacts.business_phone;
    } else {
      alert('The business has not added their phone number to call');
    }
  }

  // async saveToFavorites() {
  //   if (!this._authService.isLoggedIn()) {
  //     Swal.fire(
  //         'Please login !',
  //         'Please login as customer to add any business or promotion to your favorites list !',
  //         'warning'
  //     )
  //   } else {
  //
  //     try {
  //
  //       const resp = await this._listingService.addToFavorites(this.business.id, 'business', this.business.main_category_id, this._authService.getUserID(), this.shared_token).toPromise();
  //       console.log(resp);
  //       if (resp.success) {
  //         Swal.fire(
  //             resp.success,
  //             'The business is now in your favorites list ! you will get notifications for this business !',
  //             'success'
  //         );
  //       }
  //
  //       if (resp.error) {
  //         Swal.fire(
  //             'Failed',
  //             'Unable to add to your favorites list !',
  //             'warning'
  //         )
  //       }
  //
  //
  //     } catch ($ex) {
  //
  //       console.log($ex);
  //       Swal.fire(
  //           'Failed',
  //           'Something went wrong !',
  //           'warning'
  //       )
  //
  //     }
  //   }
  //
  // };


}
