import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
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
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {
  CustomerRewardHistoryComponent
} from "../../employees/customer-reward-history/customer-reward-history.component";
import {MyRewardHistoryComponent} from "../../shared/my-reward-history/my-reward-history.component";
import {
  BusinessOwnerActionsBottomSheetComponent
} from "../../components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  BusinessDetailOptionsPopupComponent
} from "../business-detail-options-popup/business-detail-options-popup.component";
import {CommentService} from "../../services/comment.service";
import {ShareService} from "../../services/share.service";
import {LikeService} from "../../services/like.service";
import {MayHaveSimilarListings} from "../../models/Common";
import {NgxIndexedDBService} from "ngx-indexed-db";
import DBTableNames, {businessDbTableName} from "../../schemas/dbTableNames.schema";
import {ScheduleAppointmentPopupComponent} from "../schedule-appointment-popup/schedule-appointment-popup.component";
import {window} from "rxjs/operators";


export interface Vegetable {
  name: string;
}


@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})

export class BusinessDetailComponent implements OnInit, OnChanges, OnDestroy, MayHaveSimilarListings {

  private DBTables = DBTableNames
  @Input() id: any
  @Input() uuid: any
  @Input() isPreviewMode: boolean = false
  @Output() fetched = new EventEmitter();

  activeBottomToolbarItem: string = 'favorite'
  viewMode: string = "details";
  selectedGalleryItem: any
  listingInPreview: any;

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
  business: any = undefined;
  activeTab: any = '';
  deviceWidth: any;
  shared_token: any;

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
      name: 'Contact Us',
      isActive: false
    },
    {
      name: 'Services',
      isActive: false
    },
    {
      name: 'Promos',
      isActive: false
    },
    {
      name: 'Prizes',
      isActive: false
    },
    {
      name: 'Discounts',
      isActive: false
    },

    {
      name: 'Points',
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
    // @ts-ignore
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
      public commentService: CommentService,
      public shareService: ShareService,
      public likeService: LikeService,
      public dbService: NgxIndexedDBService,
      private router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id){
      this.ngOnInit();
    }
    this.fetched.emit(this.business)
  }

  ngOnInit(): void {
    document.body.classList.add('overflow-y-scroll');
    // @ts-ignore
    // document.getElementById('section-main-sidebar')?.classList.add('d-none');

    if (!this.id) {
      this.route.paramMap.subscribe(paramMap => {
        this.businessId = paramMap.get('id') || '';
        this.shared_token = paramMap.get('shared_token') || '';
        this.getBusinessDetails(paramMap.get('id') || '');
      });
    } else {
      this.businessId = this.id
      this.getBusinessDetails(this.businessId);
    }

    this.route.queryParams.subscribe((params) => {
      if (params['from'] && params['from_id']){
        this.fromListing = {
          listing_type: params['from'],
          listing_id: params['from_id']
        }
      }
    })

    try {
      this.dbService.getByID( DBTableNames.businessDetailDbTableName, parseInt(this.businessId) ).subscribe((storeData) => {
        console.log('business from db', storeData);

        if (storeData){
          this.business = storeData
          this.fetched.emit(this.business)
        }
      })
    } catch (e){
      console.log(e)
    }

    this.setDeviceWidth();
    this.activeTab = 'Information' ;
  }

  getContainerClass(){
    if(this.deviceWidth <= 1200){
      return 'container-fluid' ;
    }
    return 'container';
  }

  async getBusinessDetails(business_id: any) {
   // alert(business_id);
    try {

      this.progress = true ;
      const resp = await this.listingService.getBusinessDetailsWithSharable(business_id, this.shared_token).toPromise();
      console.log(resp);

      if (resp.business) {
        this.business = resp.business ;
        this.dbService.update(DBTableNames.businessDetailDbTableName ,resp.business).subscribe((storeData) => {
          // to do
        })
        if(this.business.gallery_chunks_lg){
        }

        if (this.business.promotions !== null){
          this.business.promotions.forEach((promotion: any) => {
            promotion.business = this.business ;
          });
        }
        if (this.business.loyalty_cards !== null){
          this.business.loyalty_cards.forEach((lc: any) => {
            lc.business = this.business ;
          });
        }

        this.fetched.emit(this.business);

        this.getSimilarListings(this.business.id, 'business', this.similarListings.businesses.page);
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
        'Please login as customer to add any business or promotion to your favorites list !',
        'warning'
      )
    } else {

      try {

        const resp = await this.listingService.addToFavorites(this.business.id, 'business', this.business.main_category_id, this.authService.getUserID(), this.shared_token).toPromise();
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
    this.bottomSheet.open(SharePopupComponent, {
      data:  {
        listing: this.business,
        listing_id : this.business.id,
        listing_type: 'business'
      },
      panelClass: 'share-bottom-sheet',
    });

  }

  showMoreOptions(){
    this.bottomSheet.open(BusinessDetailOptionsPopupComponent, {
      data:  {
        listing: this.business,
        listing_id : this.business.id,
        listing_type: 'business'
      }
    }).afterDismissed().subscribe((data: any) => {
      if (data && data.activeTab){
        this.activeTab = data.activeTab
      }
      console.log('Bottom sheet has been dismissed.');
      console.log(data);
    });
  }

  viewHistory(rewardType: string) {
    this.dialog.open( MyRewardHistoryComponent, {
      width: '800px',
      data: {
        reward_type: rewardType,
        business_id: this.businessId,

      }
    }).afterClosed().subscribe(result => {

    });
  }

  similarListings: { businesses: any; promotions: any; lcs: any } = {
    businesses: {
      page: 1
    },
    promotions: {
      page: 1
    },
    lcs: {
      page: 1
    }
  }
  previewState: string = "hidden";
  galleryOpenedAt: any;

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
    // document.getElementById('section-main-sidebar')?.classList.add('d-none');

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

  viewBusinessDetails($event: any) {
     // @ts-ignore
    window.open('/business-details/' + $event.id + `?from=business&from_id=${this.businessId}`, '_blank');
  }
  viewPromotionDetails($event: any) {
    // @ts-ignore
    window.open('/promotion-details/' + $event.id + `?from=business&from_id=${this.businessId}`, '_blank');
  }
  viewLCDetails($event: any) {
    // @ts-ignore
    window.open('/business/loyalty-cards/' + $event.id + `?from=business&from_id=${this.businessId}`, '_blank');
  }

  onBackPressed() {
   // @ts-ignore
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

  scrollToSection(sectionId: string) {
    // @ts-ignore
    document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  }

  scheduleAppointment(){
    this.activeBottomToolbarItem = 'appointment'
    let data = {
      business: this.business

    }
    this.bottomSheet.open( ScheduleAppointmentPopupComponent, {
      data:  data
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-y-scroll');
    // document.getElementById('section-main-sidebar')?.classList.remove('d-none');

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
