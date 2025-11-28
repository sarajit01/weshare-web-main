import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {AuthService} from "../../services/auth.service";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LikeService} from "../../services/like.service";
import {CommentService} from "../../services/comment.service";
import {ShareService} from "../../services/share.service";
import {
  BusinessDetailOptionsPopupComponent
} from "../../business/business-detail-options-popup/business-detail-options-popup.component";
import {MayHaveSimilarListings} from "../../models/Common";
import {SnackbarService} from "../../services/snackbar.service";
import {NgxIndexedDBService} from "ngx-indexed-db";
import DBTableNames from "../../schemas/dbTableNames.schema";

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit, OnChanges, MayHaveSimilarListings {
  @Input() _id: any
  viewMode: string = "details";
  selectedGalleryItem: any
  previewState: string = "hidden";
  galleryOpenedAt: any;

  @Input() isPreviewMode: boolean = false
  @Output() fetched = new EventEmitter();

  vegetables: Vegetable[] = [
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];
  similarListings: { businesses: any; promotions: any; lcs: any } = {
    businesses: {},
    promotions: {},
    lcs: {}
  }

  id: any | undefined;
  promotion: any | undefined;
  activeTab: any;
  business: any;

  /*tabs : any = [
    {
      name: 'Descripcion de la Promocion' ,
      isActive: true
    },
    {
      name: 'About the Business' ,
      isActive: false
    },
    {
      name: 'Conditions' ,
      isActive: false
    },
    {
      name: 'Restrictions' ,
      isActive: false
    },
    {
      name: 'Gallery' ,
      isActive: false
    },
    {
      name: 'Promotions & Discounts' ,
      isActive: false
    },

    {
      name: 'Reviews' ,
      isActive: false
    },

    {
      name: 'Working Hours' ,
      isActive: false
    },
    {
      name: 'Contact Us' ,
      isActive: false
    },
    {
      name: 'Location & Contacts' ,
      isActive: false
    },
    {
      name: 'Book Appointment' ,
      isActive: false
    },

  ];*/

  tabs: any = [
    {
      name: 'Information',
      isActive: true
    },
    {
      name: 'Conditions',
      isActive: false
    },
    {
      name: 'Services',
      isActive: false
    },
    {
      name: 'About Us',
      isActive: false
    }

  ]

  deviceWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDeviceWidth();
  }

  setDeviceWidth(): void {
    this.deviceWidth = window.innerWidth;
  }

  isMobile() {
    if (this.deviceWidth <= 480) {
      return true;
    }
    return false;
  }


  getContainerClass() {
    if (this.deviceWidth <= 1200) {
      return 'container-fluid';
    }
    return 'container';
  }

  activateTab(tabToActivate: any) {

    this.tabs.forEach((tab: any) => {
      tab.isActive = false;
    });

    tabToActivate.isActive = true;
    this.activeTab = tabToActivate.name;
  }

  drop(event: CdkDragDrop<Vegetable[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

  dataSource = [

    {day: 'Monday', time: '9:00 AM - 8 PM'},
    {day: 'Tuesday', time: '9:00 AM - 8 PM'},
    {day: 'Wednesday', time: '9:00 AM - 8 PM'},
    {day: 'Thursday', time: '9:00 AM - 8 PM'},
    {day: 'Friday', time: '9:00 AM - 8 PM'},
    {day: 'Saturday', time: '9:00 AM - 8 PM'},
    {day: 'Sunday', time: '9:00 AM - 8 PM'},
  ];
  code = false;
  shared_token: any;

  fromListing: any = null


  constructor(
      public listingService: ListingService,
      private route: ActivatedRoute,
      public sweet: SweetAlertService,
      public authService: AuthService,
      public dialog: MatDialog,
      private bottomSheet: MatBottomSheet,
      public likeService: LikeService,
      public commentService: CommentService,
      public shareService: ShareService,
      private snackbarService: SnackbarService,
      public dbService: NgxIndexedDBService,
      private router: Router
  ) {


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes._id) {
      this.ngOnInit();
    }
  }

  getDetailsFromDB(id: any){
    this.dbService.getByID(DBTableNames.promotionDetailDbTableName, parseInt(id)).subscribe((storeData) => {
      if (storeData){
        this.promotion = storeData
        this.fetched.emit(this.promotion)
      }
    })
  }

  ngOnInit(): void {
    if (!this._id) {
      this.id = this.route.snapshot.paramMap.get('id')
      this.getDetailsFromDB(this.id)
    } else {
      this.id = this._id;
      this.getDetailsFromDB(this.id)
    }


    this.route.queryParams.subscribe((params) => {
      if (params['from'] && params['from_id']){
        this.fromListing = {
          listing_type: params['from'],
          listing_id: params['from_id']
        }
      }
    })

    this.getPromoDetails();

    this.setDeviceWidth();
    this.activeTab = 'Information' ;

    this.route.paramMap.subscribe(paramMap => {

      this.shared_token = paramMap.get('shared_token') || '' ;

    });

  }

  async getPromoDetails() {

    try {

      const resp = await this.listingService.getPromotionDetails(this.id).toPromise();
      console.log(resp);
      if(resp.promotion){

        this.promotion = resp.promotion ;
        this.dbService.update(DBTableNames.promotionDetailDbTableName, resp.promotion).subscribe((storeData) => {
          //
        })
        if(this.promotion.business){
          this.business = this.promotion.business ;

          if (this.business && this.business.promotions){
            this.business.promotions.forEach((promo: any) => {
              promo.business = this.business ;
            })
          }
          if (this.business && this.business.loyalty_cards){
            this.business.loyalty_cards.forEach((lc: any) => {
              lc.business = this.business ;
            })
          }
        }

      }

      this.fetched.emit(this.promotion)

      this.getSimilarListings(this.promotion.id , 'promotion', 1);

    } catch ($ex) {

    }

  }



  viewCode(code: string){
    this.sweet.successNotification( code , 'Enter this code to get discount on your purchase !'  );
  }



  isTabActive(tab: any) {
    if(tab.isActive === true){
      return 'bg-success' ;
    }
    return '' ;

  }


  isLinkActive(tab: any) {
    if(tab.isActive === true){
      return 'nav-tab-link-active' ;
    }
    return 'nav-tab-link' ;

  };

  openSharePopup() {
    this.bottomSheet.open(SharePopupComponent, {
      data:{
        listing: this.promotion,
        listing_id : this.promotion.id,
        listing_type: 'promotion'
      },
      panelClass: 'share-bottom-sheet',
    });

  };

  async saveToFavorites() {

    if(! this.authService.isLoggedIn()){
      Swal.fire(
        'Please login !',
        'Please login as customer to add any business or promotion to your favorites list !',
        'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(this.promotion.id, 'promotion', this.business.main_category_id, this.authService.getUserID(), this.shared_token).toPromise();
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

  showMoreOptions(){
    this.bottomSheet.open(BusinessDetailOptionsPopupComponent, {
      data:  {
        listing: this.promotion,
        listing_id : this.promotion.id,
        listing_type: 'promotion'
      }
    }).afterDismissed().subscribe((data: any) => {
      if (data && data.activeTab){
        this.activeTab = data.activeTab
      }
      console.log('Bottom sheet has been dismissed.');
      console.log(data);
    });
  }


  async getSimilarListings(listing_id: number, listingType: string, page: number): Promise<void> {
    try {
      if (listingType === "business"){
        this.similarListings.businesses.isLoading = true
      }
      if (listingType === "promotion"){
        this.similarListings.promotions.isLoading = true
      }
      if (listingType === "lc"){
        this.similarListings.lcs.isLoading = true
      }

      const resp = await this.listingService.similarListings(listingType, listing_id,this.authService.getUserID(), page).toPromise()
      console.log('Similar listings API - ', resp);
      if (resp.data){
        if (listingType === "business"){
          this.similarListings.businesses.data = resp.data
        }
        if (listingType === "promotion"){
          this.similarListings.promotions.data = resp.data
        }
        if (listingType === "lc"){
          this.similarListings.lcs.data = resp.data
        }
      }
    } catch (ex) {
      this.snackbarService.openSnackBar(`Failed to load similar ${listingType}`)
    } finally {
      if (listingType === "business"){
        this.similarListings.businesses.isLoading = false
      }
      if (listingType === "promotion"){
        this.similarListings.promotions.isLoading = false
      }
      if (listingType === "lc"){
        this.similarListings.lcs.isLoading = false
      }
    }
  }

  setViewMode(viewMode: string){
    this.viewMode = viewMode;
  }



  onGalleryItemSelected($event: any) {
    this.selectedGalleryItem = $event;
    this.setViewMode('gallery')
    this.previewState = "expanded"
    this.galleryOpenedAt = crypto.randomUUID()
    console.log("Selected Item", this.selectedGalleryItem)
  }

  onCloseGallery() {
    setTimeout(() => {
      this.setViewMode('details')
    }, 1000)
  }


  // viewBusinessDetails($event: any) {
  //   this.router.navigate(['/business-details/' + $event.id]).then(result => {  window.open('/business-details/' + $event.id, '_blank'); });
  // }
  // viewPromotionDetails($event: any) {
  //   this.router.navigate(['/promotion-details/' + $event.id]).then(result => {  window.open('/promotion-details/' + $event.id, '_blank'); });
  // }
  // viewLCDetails($event: any) {
  //   this.router.navigate(['/business/loyalty-cards/' + $event.id]).then(result => {  window.open('/business/loyalty-cards/' + $event.id, '_blank'); });
  // }

  viewBusinessDetails($event: any) {
    window.open('/business-details/' + $event.id + `?from=promotion&from_id=${this.promotion.id}`, '_blank');
  }
  viewPromotionDetails($event: any) {
    window.open('/promotion-details/' + $event.id + `?from=promotion&from_id=${this.promotion.id}`, '_blank');
  }
  viewLCDetails($event: any) {
    window.open('/business/loyalty-cards/' + $event.id + `?from=promotion&from_id=${this.promotion.id}`, '_blank');
  }

  onBackPressed() {
    window.close()
    // if (this.fromListing.listing_id && this.fromListing.listing_type){
    //   if (this.fromListing.listing_type === 'business'){
    //     this.router.navigate(['/business-details/' + this.fromListing.listing_id]);
    //   }
    //   else if (this.fromListing.listing_type === 'promotion'){
    //     this.router.navigate(['/promotion-details/' + this.fromListing.listing_id]);
    //   }
    //   else if (this.fromListing.listing_type === 'loyalty-card'){
    //     this.router.navigate(['/business/loyalty-cards/' + this.fromListing.listing_id]);
    //   }
    // }
  }

  getDeviceWiseHeight() {
    if (document.body.clientWidth < 768) {
      return 250
    }
    // @ts-ignore
    if (document.body.clientWidth < 990) {
      return 350
    }

    return  400

  }
}
