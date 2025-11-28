import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-share-popup-content',
  templateUrl: './share-popup-content.component.html',
  styleUrls: ['./share-popup-content.component.css']
})
export class SharePopupContentComponent implements OnInit {

  @Input() data: any
  @Output() onDismissed = new EventEmitter()
  previewState: string = "expanded"


  listingType: any ;
  listingID: any ;
  listing: any  ;
  progress: boolean = false ;
  link: any = null ;

  constructor(
      public authService: AuthService,
      public snackbarService: SnackbarService,
      public listingService: ListingService) {

  }

  closePopup(){
   // this._bottomSheet.dismiss(true);
  }

  async ngOnInit() {
    this.listingType = this.data.listing_type ;
    this.listingID = this.data.listing_id ;
    this.listing = this.data.listing ;
    this.progress = this.data.progress ;
    await this.getSharable().then(r => {
    });
  }

  async getSharable() {
    if(! this.authService.isLoggedIn()){
      this.snackbarService.openSnackBar('Please Login to share');
      return ;
    } else {

      try {
        this.progress = true ;
        const resp = await this.listingService.getSharableLink( this.listingType, this.listingID, this.authService.getUserID()).toPromise();
        console.log(resp);
        if (resp.listing) {
          this.listing = resp.listing;
        }
        if (resp.link) {
          this.link = resp.link;
        }
        if (resp.error) {
          this.snackbarService.openSnackBar(resp.error);
        }
      } catch ($ex) {
        console.log($ex);
        this.snackbarService.openSnackBar('Something went wrong to get the sharable link');

      } finally {
        this.progress = false ;
      }
    }

  }




  changePreviewState(state: string){
    this.previewState = state
  }

  onClose(): void {
    this.changePreviewState('hidden')
    setTimeout(()=> {
      this.onDismissed.emit(true)
    }, 500)
  }

  onSwipeDown(): void {
    this.onClose()
  }


}
