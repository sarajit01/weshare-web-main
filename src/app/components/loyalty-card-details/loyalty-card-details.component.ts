import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {FileUploadService} from "../../services/file-upload.service";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateClaimComponent} from "../../customer/create-claim/create-claim.component";
import {Vegetable} from "../../business/business-detail/business-detail.component";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {MyRewardHistoryComponent} from "../../shared/my-reward-history/my-reward-history.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LikeService} from "../../services/like.service";
import {CommentService} from "../../services/comment.service";
import {ShareService} from "../../services/share.service";
import {
  BusinessDetailOptionsPopupComponent
} from "../../business/business-detail-options-popup/business-detail-options-popup.component";
import {MayHaveSimilarListings} from "../../models/Common";
import {NgxIndexedDBService} from "ngx-indexed-db";

import DBTableNames from "../../schemas/dbTableNames.schema";

@Component({
  selector: 'app-loyalty-card-details',
  templateUrl: './loyalty-card-details.component.html',
  styleUrls: ['./loyalty-card-details.component.css']
})
export class LoyaltyCardDetailsComponent implements OnInit, OnChanges, MayHaveSimilarListings {

  DBTableNames = DBTableNames;
  @Input() id: any
  viewMode: string = "details";
  selectedGalleryItem: any

  @Input() isPreviewMode: boolean = false
  @Output() fetched = new EventEmitter();

  fromListing: any = null

  vegetables: Vegetable[] = [
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];
  progress: any = false;
  businessId: any;
  loyalty_card_id: any;
  business: any = undefined;
  loyalty_card: any;
  activeTab: any = '';
  deviceWidth: any;
  shared_token: any;
  similarListings: {
    businesses: any
    promotions: any
    lcs: any
  } = {
    businesses: {page: 1},
    promotions: {page: 1},
    lcs: {page: 1}
  }

  previewState: string = "hidden";
  galleryOpenedAt: any;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDeviceWidth();
  }

  isMobile() {
    if (this.deviceWidth <= 480) {
      return true;
    }
    return false;
  }


  /* tabs : any = [
     {
       name: 'Information' ,
       isActive: true
     },
     {
       name: 'Gallery' ,
       isActive: false
     },
     {
       name: 'Notifications' ,
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

   ]; */

  tabs: any = [
    {
      name: 'Information',
      isActive: true
    },
    {
      name: 'Prizes',
      isActive: false
    },
    {
      name: 'Conditions',
      isActive: false
    },
    // {
    //   name: 'Conditions' ,
    //   isActive: false
    // },
    {
      name: 'About Us',
      isActive: false
    }
  ]

  activateTab(tabToActivate: any) {

    this.tabs.forEach((tab: any) => {
      tab.isActive = false;
    });

    tabToActivate.isActive = true;
    this.activeTab = tabToActivate.name;
  }

  setDeviceWidth(): void {
    this.deviceWidth = window.innerWidth;
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
  share: any = false;
  feedbackForm = false;
  starRating = 5;

  constructor(
      private fb: UntypedFormBuilder,
      private listingService: ListingService,
      private uploadService: FileUploadService,
      private categoryService: CategoryService,
      private snackbarService: SnackbarService,
      public authService: AuthService,
      private sweet: SweetAlertService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
      private bottomSheet: MatBottomSheet,
      public likeService: LikeService,
      public commentService: CommentService,
      public shareService: ShareService,
      public dbService: NgxIndexedDBService,
      private router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.ngOnInit();
    }
  }

  getDetailsFromDb(id: any){
    this.dbService.getByID(DBTableNames.loyaltyCardDetailDbTableName, parseInt(id)).subscribe((storeData) => {
      this.loyalty_card = storeData
      this.fetched.emit(this.loyalty_card)
    })
  }

  ngOnInit(): void {
    if (!this.id) {
      this.route.paramMap.subscribe(paramMap => {
        this.loyalty_card_id = paramMap.get('id') || '';
        this.shared_token = paramMap.get('shared_token') || '';
        this.getDetailsFromDb(this.loyalty_card_id)
        this.getLoyaltyCard(paramMap.get('id') || '');

      });
    } else {
      this.getDetailsFromDb(this.id)
      this.getLoyaltyCard(this.id);

    }


    this.route.queryParams.subscribe((params) => {
      if (params['from'] && params['from_id']){
        this.fromListing = {
          listing_type: params['from'],
          listing_id: params['from_id']
        }
      }
    })


    this.setDeviceWidth();
    this.activeTab = 'Information' ;


  }

  getContainerClass(){
    if(this.deviceWidth <= 1200){
      return 'container-fluid' ;
    }
    return 'container';
  }

  async getLoyaltyCard(id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getLC(id).toPromise();
      console.log(resp);

      if (resp.loyalty_card) {
        this.dbService.update( DBTableNames.loyaltyCardDetailDbTableName, resp.loyalty_card).subscribe((storeData) => {
          // do some tasks ..
        })
        this.loyalty_card = resp.loyalty_card ;
        if(this.loyalty_card.business){
          this.business = this.loyalty_card.business ;
          if (this.business.promotions){
            this.business.promotions.forEach((promo: any) => {
              promo.business = this.business
            })
          }
          if (this.business.loyalty_cards){
            this.business.loyalty_cards.forEach((lc: any) => {
              lc.business = this.business
            })
          }

          this.fetched.emit(this.loyalty_card)
          this.getSimilarListings(this.business.id, 'business',  this.similarListings.businesses.page)
          this.getSimilarListings(this.loyalty_card.id, 'lc',  this.similarListings.lcs.page)

        }
      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }


  async claimBusiness() {
    try {
      this.progress = true ;
      const resp = await this.listingService.claimBusiness(this.authService.getUserID() , this.businessId).toPromise();
      console.log(resp);

      if (resp.success) {
        this.sweet.successNotification('Business Claimed successfully' , resp.success);
      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to claim the business' ,resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }

  claimPromo(claim_type: string) {
    this.dialog.open( CreateClaimComponent, {
      width: '600px',
      data: {
        business: this.business,
        claim_type: claim_type
      }
    });
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

  }


  async saveToFavorites() {
    if (!this.authService.isLoggedIn()) {
      Swal.fire(
        'Please login !',
        'Please login as customer to add the loyalty card to your favorites list !',
        'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(this.loyalty_card.id, 'loyalty_card', this.business.main_category_id, this.authService.getUserID(), this.shared_token).toPromise();
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

  openSharePopup() {
    this.bottomSheet.open( SharePopupComponent, {
      data: {
        listing: this.loyalty_card,
        listing_id : this.loyalty_card.id,
        listing_type: 'lc'
      },
      panelClass: 'share-bottom-sheet',
    })

  }

  viewHistory(rewardType: string) {
    this.dialog.open( MyRewardHistoryComponent, {
      width: '800px',
      data: {
        reward_type: rewardType,
        business_id: this.loyalty_card.business_id,

      }
    }).afterClosed().subscribe(result => {

    });
  }

  showMoreOptions(){
    this.bottomSheet.open(BusinessDetailOptionsPopupComponent, {
      data:  {
        listing: this.loyalty_card,
        listing_id : this.loyalty_card.id,
        listing_type: 'loyalty_card'
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
    window.open('/business-details/' + $event.id + `?from=loyalty-card&from_id=${this.loyalty_card.id}`, '_blank');
  }
  viewPromotionDetails($event: any) {
    window.open('/promotion-details/' + $event.id + `?from=loyalty-card&from_id=${this.loyalty_card.id}`, '_blank');
  }
  viewLCDetails($event: any) {
    window.open('/business/loyalty-cards/' + $event.id + `?from=loyalty-card&from_id=${this.loyalty_card.id}`, '_blank');
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
