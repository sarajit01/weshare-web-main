import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ScheduleAppointmentPopupComponent} from "../schedule-appointment-popup/schedule-appointment-popup.component";

@Component({
  selector: 'app-business-detail-options-popup',
  templateUrl: './business-detail-options-popup.component.html',
  styleUrls: ['./business-detail-options-popup.component.css']
})
export class BusinessDetailOptionsPopupComponent implements OnInit {

  constructor(
      private _bottomSheet: MatBottomSheet,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<BusinessDetailOptionsPopupComponent>,
  ) { }

  ngOnInit(): void {
  }

  closePopup(){
    this._bottomSheet.dismiss(true);
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

  scheduleAppointment(){
    var data = null ;
    if (this.data.listing_type === 'business'){
      data = {
        business: this.data.listing
      }
    } else {
      data = {
        business: this.data.listing.business
      }
    }
    this._bottomSheet.open( ScheduleAppointmentPopupComponent, {
      data:  data
    });
  }


  activateTab(tab: string) {
    this._bottomSheet.dismiss({activeTab: tab})
  }
}
