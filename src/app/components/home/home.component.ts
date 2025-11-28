import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {
  businessDbTableName,
  featuredBusinessDbTableName,
  featuredLCDbTableName,
  featuredPromotionDbTableName, listingsDbTableName, loyaltyCardDbTableName,
  promotionDbTableName
} from "../../schemas/dbTableNames.schema";
import {ShareService} from "../../services/share.service";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  ListingDetailsBottomSheetComponent
} from "../../business/listing-details-bottom-sheet/listing-details-bottom-sheet.component";
import {ROUTES} from "../../core/routes";
import {AuthService} from "../../services/auth.service";

// import { DatabaseService } from '../../db';
// import { RxHeroDocument } from '../../RxDB.d';
// import {Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [DatabaseService]
})
export class HomeComponent implements OnInit {
  sidebar = false;
  progress: boolean = false;
  tempDoc: any;


  // private heroes$: Observable<RxHeroDocument[]> | undefined;


  listing_type: string = '';

  categories: any = [];
  public businesses: [] | undefined;
  public promotions: [] | undefined;

  public random_listings: any[] = [];

  public featured_promos: any = [];
  public featured_businesses: any = [];
  listingInPreview: any;

  previewState: string = "expanded"

  constructor(
      public listingService: ListingService,
      public catService: CategoryService,
      public route: ActivatedRoute,
      private dbService: NgxIndexedDBService,
      public sharingService: ShareService,
      public bottomSheet: MatBottomSheet,
      public router: Router,
      public authService: AuthService,
      // private dbService: DatabaseService
  ) {

  }

  getRole(){
    return this.authService.getRole();
  }

  clearIfHasPastDBVersions(){
    const outDatedVersions = ["1.0", '1.1', '1.2', '1.3'];
    const dbName = "weshare-web-v" ;


    const indexedDB = window.indexedDB
        // @ts-ignore
     ||   window.mozIndexedDB
        // @ts-ignore
     || window.webkitIndexedDB
        // @ts-ignore
        || window.msIndexedDB;
    // @ts-ignore
    outDatedVersions.forEach((versionNum: string) => {

      var req = indexedDB.deleteDatabase( dbName + versionNum);
      req.onsuccess = function () {
        console.log("Deleted database successfully");
      };
      req.onerror = function () {
        console.log("Couldn't delete database");
      };
      req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
      };
    })
  }

  ngOnInit(): void {

    this.clearIfHasPastDBVersions()

    this.getCategories();
  //  this.getRandomListings();
  /*  this.getBusinessListings();
    this.getPromoListings();
    this.getFeaturedListings('promotion', 'featured');
    this.getFeaturedListings('business', 'featured');
    */

    this.route.params.subscribe(params => {
      this.random_listings = []
      this.listing_type = params['listing_type'] || '' ;
      if (!this.listing_type){
        this.listing_type = ''
      }
      if (this.listing_type === 'TCF'){
        this.listing_type = 'lc'
      }

      // let offlineDbName = 'listings_' + this.listing_type
      // if (localStorage.getItem(offlineDbName) !== null){
      //   try {
      //     let offlineData = JSON.parse(localStorage.getItem(offlineDbName) || "");
      //     console.log('Offline Data', offlineData)
      //     this.displayResults(offlineData)
      //
      //   } catch ($ex){
      //     console.log('Offline data not loaded', $ex);
      //   }
      //
      // }

      this.getDataFromDB()
    //  alert(this.listing_type);
      this.getSearchResults();

    });


    // this.heroes$ = this.dbService.db.hero // collection
    //     .find()
    //    // .sort('name') // query
    //     .$.pipe(
    //        //  observable
    //
    //     );
    //
    // this.heroes$.forEach((hero: any) => {
    //   console.log(hero.name);
    // })
    //
    // this.tempDoc = this.dbService.db.hero.newDocument({
    //   name: crypto.randomUUID(),
    //   maxHP: 100,
    //   hp: 100
    // })
    //
    //
    // console.log(this.tempDoc.save());
    //
    // console.log('RxDB heros')
    // console.log(this.heroes$)

  }

  async getDataFromDB() {
    var data: any = {}
    console.log('Data from DB')

    if (this.listing_type === '' || !this.listing_type){
      this.dbService.getByID(listingsDbTableName, 1).subscribe((storeData: any) => {
        console.log('All L', storeData)
        this.random_listings = storeData.listings
      })
    }
    if (this.listing_type === "business") {
      this.dbService.getAll(businessDbTableName).subscribe((storeData: any) => {
        this.businesses = storeData
        this.displayResults({businesses: {data: this.businesses}});
      });
    }

    if (this.listing_type === "promotion") {
      this.dbService.getAll(promotionDbTableName).subscribe((storeData: any) => {
        this.displayResults({promotions: {data: storeData}})
      });
    }
    if (this.listing_type === "lc") {
      this.dbService.getAll(loyaltyCardDbTableName).subscribe((storeData: any) => {
        this.displayResults({lcs: {data: storeData}})
      });

    }

  }

  async getCategories() {

    const resp = await this.catService.getCategories('').toPromise();
    console.log(resp);

    let key = 0 ;
    let inserted = 0 ;

    resp.forEach((currentValue: any, index: any) => {
        if(this.categories[key] === undefined) {
          this.categories[key] = [];
          inserted = 0;
        }
        inserted++ ;
        if(inserted <= 6){
          this.categories[key].push(currentValue);

        }

    });


  //  this.categoryOptions = resp ;


  }


  hideSidebar(){
    this.sidebar = false ;
  }

  showSideBar(){
    this.sidebar = true ;
  }

  async getBusinessListings() {

    try {

      const resp = await this.listingService.getListing(this.listing_type, '','').toPromise();
      console.log(resp);
      if (resp.data) {

        this.businesses = resp.data;
        console.log(this.businesses);
      }

    } catch ($ex) {

    }

  }

  async getRandomListings() {

    try {
      this.progress = true ;
      const resp = await this.listingService.getRandomListings().toPromise();
      console.log('random listings', resp);
      if (resp.listings) {
        this.random_listings = resp.listings;
      }

    } catch ($ex) {

    } finally {
      this.progress = false;
    }

  }

  displayResults(resp: any){
    let updatedListings = []
    if (resp.businesses && resp.businesses.data && resp.businesses.data.length) {
      resp.businesses.data.forEach((business: any) => {
        var listing = {
          id: crypto.randomUUID(),
          listing_type: "business",
          business: business
        };
        updatedListings.push(listing)
      })
    }
    if (resp.promotions && resp.promotions.data && resp.promotions.data.length) {
      resp.promotions.data.forEach((promotion: any) => {
        var listing = {
          id: crypto.randomUUID(),
          listing_type: "promotion",
          promotion: promotion
        };
        updatedListings.push(listing)
      })
    }
    if (resp.ads && resp.ads.data && resp.ads.data.length) {
      resp.ads.data.forEach((ad: any) => {
        var listing = {
          id: crypto.randomUUID(),
          listing_type: "ad",
          ad: ad
        };
        updatedListings.push(listing)
      })
    }
    if (resp.lcs && resp.lcs.data && resp.lcs.data.length) {
      resp.lcs.data.forEach((loyalty_card: any) => {
        var listing = {
          id: crypto.randomUUID(),
          listing_type: "loyalty_card",
          loyalty_card: loyalty_card
        };
        updatedListings.push(listing)
      })
    }

    if (resp.featured_businesses && resp.featured_businesses.data && resp.featured_businesses.data.length) {
      var listing = {
        id: crypto.randomUUID(),
        listing_type: "featured_businesses",
        businesses: resp.featured_businesses.data,
        current_page: resp.featured_businesses.current_page
      }

      resp.featured_businesses.data.forEach((business: any) => {
        if (business.promotions && business.promotions.length){
          var promos = {
            id: crypto.randomUUID(),
            listing_type: "featured_promotions",
            promotions: business.promotions,
            business: business
          }
          updatedListings.push(promos)

        }
        if (business.lcs && business.lcs.length){

          var lcs = {
            id: crypto.randomUUID(),
            listing_type: "featured_lcs",
            lcs: business.lcs,
            business: business
          }
          updatedListings.push(lcs)

        }
      });

      updatedListings.push(listing)
    }

    if (resp.featured_promotions && resp.featured_promotions.data && resp.featured_promotions.data.length) {
      var listingPro = {
        id: crypto.randomUUID(),
        listing_type: "featured_promotions",
        promotions: resp.featured_promotions.data,
        current_page: resp.featured_promotions.current_page
      }
      updatedListings.push(listingPro)
    }

    if (resp.featured_lcs && resp.featured_lcs.data && resp.featured_lcs.data.length) {
      var listingLc = {
        id: crypto.randomUUID(),
        listing_type: "featured_lcs",
        lcs: resp.featured_lcs.data,
        current_page: resp.featured_lcs.current_page
      }
      updatedListings.push(listingLc)
    }

    updatedListings =  this.shuffleArray(updatedListings);

    console.log(updatedListings);
   // alert(this.listing_type)

    let old = this.random_listings ;
    console.log('random listings in func', this.random_listings)
    console.log('updated listings in func', updatedListings)

    updatedListings.forEach((listing: any) => {
      this.random_listings.push(listing);
    });


    // this.random_listings = updatedListings

    if (this.listing_type === '' || this.listing_type === 'all' || this.listing_type === null || this.listing_type === undefined) {
      console.log('DDDD')
      updatedListings =  this.shuffleArray(updatedListings);

      this.dbService.update(listingsDbTableName, {
        id: 1,
        listings: updatedListings
      }).subscribe((storeData: any) => {
        console.log('all list', storeData)
      })
    }
    console.log('Listings loaded', this.random_listings );
  }

  async getSearchResults() {

    try {
      this.progress = true;
      const resp = await this.listingService.getSearchResults(this.listing_type, 8).toPromise();
      console.log('Search listings from API', resp);

      if (resp.businesses && resp.businesses.data && resp.businesses.data.length) {
        this.dbService.bulkPut('businesses', resp.businesses.data).subscribe((data) => {
          console.log(data);
        })
      }
      if (resp.promotions && resp.promotions.data && resp.promotions.data.length) {
        this.dbService.bulkPut('promotions', resp.promotions.data).subscribe((data) => {
          console.log(data);
        })
      }
      if (resp.lcs && resp.lcs.data && resp.lcs.data.length) {
        this.dbService.bulkPut('loyalty_cards', resp.lcs.data).subscribe((data) => {
          console.log(data);
        })
      }

      if (resp.featured_businesses && resp.featured_businesses.data && resp.featured_businesses.data.length) {
        this.dbService.bulkPut( featuredBusinessDbTableName, resp.featured_businesses.data).subscribe((data) => {
          console.log(data);
        })
      }

      if (resp.featured_promotions && resp.featured_promotions.data && resp.featured_promotions.data.length) {
        this.dbService.bulkPut( featuredPromotionDbTableName, resp.featured_promotions.data).subscribe((data) => {
          console.log(data);
        })
      }

      if (resp.featured_lcs && resp.featured_lcs.data && resp.featured_lcs.data.length) {
        this.dbService.bulkPut( featuredLCDbTableName, resp.featured_lcs.data).subscribe((data) => {
          console.log(data);
        })
      }

      // localStorage.setItem('listings_' + this.listing_type , JSON.stringify(resp));

      this.displayResults(resp);


    } catch ($ex) {

    } finally {
      this.progress = false;
    }

  }

  shuffleArray(array: any): any {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  async getFeaturedListings(listingType: string, featuredType: string) {
    try {
      const resp = await this.listingService.getFeaturedListings(listingType, featuredType).toPromise();
      console.log(resp);
      if (resp.featured_listings) {
        if(listingType === 'promotion'){
          this.featured_promos = resp.featured_listings;
        }
        if(listingType === 'business'){
          this.featured_businesses = resp.featured_listings;
        }
      }
    } catch ($ex) {
    }
  }

  async getPromoListings() {
    try {
      const resp = await this.listingService.getListing('promotion', '','').toPromise();
      console.log(resp);
      if (resp.data) {
        this.promotions = resp.data;
        console.log(this.promotions);
      }

    } catch ($ex) {

    }

  }

  onScrolledToBottom() {
    console.log('Scrolled to bottom!');
    // Perform actions when scrolled to bottom
  }

  onScrolledToTop() {
    console.log('Scrolled to top!');
    // Perform actions when scrolled to top
  }

  setListingInPreview(listing: any){
    this.listingInPreview = listing
    console.log('Listing in preview', this.listingInPreview);
    this.changePreviewState('expanded')
  }

  setBusinessInPreview(business: any){
    console.log('Event from classic', business);
    // if (this.previewState !== 'hidden'){
    //   this.closePopup()
    // }
    this.setListingInPreview({
      listing_type: 'business',
      listing_id: business.id ,
      listing: business
    })
  }

  setLCInPreview(lc: any){
    console.log('Event from classic', lc);
    // if (this.previewState !== 'hidden'){
    //   this.closePopup()
    // }
    this.setListingInPreview({
      listing_type: 'loyalty_card',
      listing_id: lc.id ,
      listing: lc
    })
  }

  setPromoInPreview(promo: any){
    console.log('Event from classic', promo);
    // if (this.previewState !== 'hidden'){
    //   this.closePopup()
    // }
    this.setListingInPreview({
      listing_type: 'promotion',
      listing_id: promo.id ,
      listing: promo
    })
  }

  closePopup() {
    this.changePreviewState('hidden')
    // setTimeout(()=> {
    //   this.listingInPreview = null ;
    // }, 1000);
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
          this.changePreviewState('expanded')
        } else { /* down swipe */
          console.log('Down!');
          switch (this.previewState) {
            case 'expanded' : {
              this.changePreviewState('collapsed');
              break
            }
            case 'collapsed' : {
              this.changePreviewState('hidden');
              break
            }
          }
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };

  changePreviewState(state: string){
    this.previewState = state
    // switch (state) {
    //
    //   case 'expanded' : {
    //     alert('Expanded')
    //     document.getElementById('section-main-sidebar')?.classList.add('d-none');
    //     break;
    //   }
    //   case 'hidden' : {
    //     alert('Hidden')
    //     document.getElementById('section-main-sidebar')?.classList.remove('d-none');
    //     break;
    //   }
    //   case 'collapsed' : {
    //     alert('Collapsed')
    //     document.getElementById('section-main-sidebar')?.classList.remove('d-none');
    //     break;
    //   }
    //
    //   default: {
    //
    //   }
    // }
  }

  protected readonly crypto = crypto;

  onSwipeDown() {
    if (this.previewState === "expanded"){
      this.changePreviewState("collapsed")
    } else {
      if (this.previewState === "collapsed") {
        this.changePreviewState("hidden")
      }
    }
  }

  onShare(listing: any){
    // this.shareService.openSharePopup({
    //   listing: listing,
    //   listing_id: listing.id,
    //   listing_type: 'business'
    // });
  }

  onSharePressed($event: any) {
    this.sharingService.openSharePopup({
      listing: $event,
      listing_id: $event.id,
      listing_type: 'business'
    });
  }

    openBusinessDetailsInPopup(listing: any) {
      this.bottomSheet.open( ListingDetailsBottomSheetComponent, {
        data:  {
          listing: listing,
          listing_id : listing.business.id,
          listing_type: 'business'
        },
        panelClass: 'share-bottom-sheet',
      });

    }

  onListingFetched($event: any) {
    if ($event && $event.id) {
      this.listingInPreview.listing = $event
    }
  }

  bottomToolbarState: string = "hidden"
  toggleBottomToolbar($event: string) {
    this.bottomToolbarState = $event
  }

  protected readonly routes = ROUTES;
}
