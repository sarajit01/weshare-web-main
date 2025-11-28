import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {PlanService} from "../../../services/plan.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {AddCustomerVisitComponent} from "../../../employees/add-customer-visit/add-customer-visit.component";
import {MatDialog} from "@angular/material/dialog";
import {SharePopupComponent} from "../../share-popup/share-popup.component";
import html2canvas from "html2canvas";
import {environment} from "../../../../environments/environment";
import {FileUploadService} from "../../../services/file-upload.service";
import {CommentsComponent} from "../../comments/comments.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../../../components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {Router} from "@angular/router";
import {
  ListingDetailsBottomSheetComponent
} from "../../../business/listing-details-bottom-sheet/listing-details-bottom-sheet.component";
import {Overlay} from "@angular/cdk/overlay";
@Component({
  selector: 'app-loyalty-card-widget',
  templateUrl: './loyalty-card-widget.component.html',
  styleUrls: ['./loyalty-card-widget.component.css']
})
export class LoyaltyCardWidgetComponent implements OnInit {

  @Input() loyalty_card: any = null;
  @Input() quickPreview: boolean | undefined
  business: any = null;
  @ViewChild('downloadLink') downloadLink: ElementRef | undefined;
  @Input() referrer_id: any = null ;
  progress: boolean = false ;
  @Input() displayOptionsOnly: boolean = false

  @Input() hasCustomActionOnClick: boolean = false
  @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>()


  visitArray: any


  constructor(
    public listingService : ListingService ,
    public authService: AuthService,
    public planService: PlanService,
    public dialog: MatDialog,
    public uploadService: FileUploadService,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    if(this.loyalty_card){
      if(this.loyalty_card.card_type === 'prize'){
        this.visitArray = new Array(parseInt(this.loyalty_card.visits_for_cash));
      }
      if(this.loyalty_card.business){
        this.business = this.loyalty_card.business ;
      }

    }

   // this.takeScreenshot();

    if(this.displayOptionsOnly){
      this.loyalty_card.is_favorite = false
    }
  }

  async saveToFavorites() {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
        'Please login !',
        'Please login as customer to add any Loyalty Card to your favorites list !',
        'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(this.loyalty_card.id, 'loyalty_card', this.business.main_category_id, this.authService.getUserID(), '').toPromise();
        console.log(resp);
        if (resp.success) {
          Swal.fire(
            resp.success,
            'The Loyalty Card is now in your favorites list',
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

  openSharePopup() {
  //  this.takeScreenshot()
    this._bottomSheet.open(SharePopupComponent, {
      data: {
        listing: this.loyalty_card,
        listing_id : this.loyalty_card.id,
        listing_type: 'lc',
        progress: this.progress
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'share-bottom-sheet',
    } );
  }

  openComments(): void {
    this._bottomSheet.open( CommentsComponent, {
      data : {
        listingType: "loyalty_card",
        listing: this.loyalty_card
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  takeScreenshot(){
    if(! this.loyalty_card.screenshot){
      this.captureLC();
    }


  }

  captureLC(){
    // @ts-ignore
    html2canvas(document.getElementById('lc'+this.loyalty_card.id), {
      useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
    }).then(async canvas => {
      let uri = canvas.toDataURL();

      let data = new FormData();

      data.append('file', uri);
      data.append('upload_preset', environment.cloudinary.preset);
      try {
        this.progress = true ;
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          console.log(resp.secure_url);
          await this.saveScreenshot(resp.secure_url);
        }
      } catch (ex: any){

      } finally {
        this.progress = false ;
      }

      /*
      // @ts-ignore
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      // @ts-ignore
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      // @ts-ignore
      this.downloadLink.nativeElement.click(); */
    });
  };

  async saveScreenshot(screenshot: string) {
    const resp = await this.listingService.saveScreenshot({
      lc_id: this.loyalty_card.id,
      screenshot: screenshot

    }).toPromise();
    console.log('capture screenshot of LC', resp);
    if (resp.success) {
      this.loyalty_card.screenshot = screenshot;
    }
  }

  getQRCodeData(){

    let string = 'Listing Type:LC\nID:'+this.loyalty_card.id+'\nCustomer ID:'+this.authService.getUserID();

    if(this.referrer_id){
      string = string + '\nReferrer ID:'+this.referrer_id ;
    }

    string = string+'\nReward type:'+this.loyalty_card.card_type;

    return encodeURI(string);
  }

  openBottomSheet() {
    if (this.authService.getRole() === "customer" && this.loyalty_card.favorite) {
      var favorite = this.loyalty_card.favorite;
      favorite.loyalty_card = this.loyalty_card;
      this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
        data: {
          favorite: favorite
        }
      });
    } else {
      this._bottomSheet.open(BusinessOwnerActionsBottomSheetComponent, {
        data: {
          listing_type : "loyalty_card",
          listing: this.loyalty_card
        } ,
        scrollStrategy: this.overlay.scrollStrategies.noop()
      });

    }
  }

  viewDetails(){
    if (this.quickPreview){
      this.itemClicked.emit(this.loyalty_card)
    } else {
      if (this.hasCustomActionOnClick) {
        this.itemClicked.emit(this.loyalty_card)
        this.openBottomSheet()
      } else {
        //  this.router.navigate(['/business/loyalty-cards/'+this.loyalty_card.id])
        this.openDetailsInBottomSheet();
      }
    }
  }

  openDetailsInBottomSheet() {
    this._bottomSheet.open(ListingDetailsBottomSheetComponent, {
      data: {
        listing_type: 'loyalty_card',
        listing_id: this.loyalty_card.id
      }
    }).afterDismissed().subscribe((data: any) => {
    });
  }

}
