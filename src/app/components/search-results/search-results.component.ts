import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Category} from "../../models/Cat";
import {NgxIndexedDBService} from "ngx-indexed-db";
import DBTableNames from 'src/app/schemas/dbTableNames.schema';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [
    trigger('TopBarAnim', [
      state('expanded', style({
        'top': '60px'
      })),
      state('collapsed', style({
        'top': '-100px'
      })),
      transition('expanded => collapsed' , [ animate('0.5s')]) ,
      transition('collapsed => expanded' , [ animate('0.5s')]) ,
    ])
  ]
})
export class SearchResultsComponent implements OnInit, AfterViewInit {

  @ViewChild('category-header-bar', { static: false }) sectionTopBar: ElementRef | undefined;

  topBarStatus: string = 'expanded'
  sidebar = false ;
  progress: boolean = false;
  cat_id: number | undefined
  cat_name: string | undefined
  filterPopupStatus: boolean = false
  topBarHeight: number = 0

  listing_type: string = '' ;

  categories : any = [] ;
  public businesses: [] | undefined;
  public promotions: [] | undefined;

  public random_listings: any[] = [] ;

  public featured_promos: any = [] ;
  public featured_businesses: any = [] ;

  listingInPreview: any;


  formSearch = this.fb.group({
    keyword: [''],
    country: [''],
    city: [''],
    cat_id: [''],
    cat_name: [''],
    businesses: [true] ,
    promotions: [true] ,
    loyalty_cards: [true]
  });

  constructor(
      private fb: UntypedFormBuilder,
      public listingService : ListingService ,
      public catService : CategoryService,
      public route: ActivatedRoute,
      public router: Router,
      public bottomSheet: MatBottomSheet,
      public dbService: NgxIndexedDBService

  ) { }

  ngAfterViewInit(): void {
      this.setTopBarHeight();
  }

  onSwipeUp(){
    this.topBarStatus = 'collapsed'
    console.log(this.topBarStatus)
  }

  onSwipeDown(){
    this.topBarStatus = 'expanded'
    console.log(this.topBarStatus)
  }

  setTopBarHeight(){

    setTimeout(() => {
      // @ts-ignore
      this.topBarHeight =  document.getElementById('category-header-bar').getBoundingClientRect().height + 15

    }, 1000)

  }

  ngOnInit(): void {
    //  this.getRandomListings();
    /*  this.getBusinessListings();
      this.getPromoListings();
      this.getFeaturedListings('promotion', 'featured');
      this.getFeaturedListings('business', 'featured');
      */

    this.route.queryParams.subscribe(async params => {
      this.random_listings = []
      this.cat_id = params['cat_id']
      this.cat_name = params['cat_name']
      if (this.cat_id) {
        this.formSearch.controls.cat_id.setValue(this.cat_id)
      } else {
        this.formSearch.controls.cat_id.setValue('')
      }

      if (this.cat_name) {
        this.formSearch.controls.cat_name.setValue(this.cat_name);
      } else {
        this.formSearch.controls.cat_name.setValue("")
      }

      if (params['country']) {
        this.formSearch.controls.country.setValue(params['country'])
      } else {
        this.formSearch.controls.country.setValue("")
      }

      if (params['city']) {
        this.formSearch.controls.city.setValue(params['city'])
      } else {
        this.formSearch.controls.city.setValue("")
      }

      if (params['keyword']) {
        this.formSearch.controls.keyword.setValue(params['keyword'])
      } else {
        this.formSearch.controls.keyword.setValue("")
      }

      if (params['businesses']) {
        if (params['businesses'].toString() === 'true') {
          this.formSearch.controls.businesses.setValue(true)
         // this.getSearchResults('business');

        } else {
          this.formSearch.controls.businesses.setValue(false)
        }
      }
      if (params['promotions']) {
        if (params['promotions'].toString() === 'true') {
          this.formSearch.controls.promotions.setValue(true)
        //  this.getSearchResults('promotion');

        } else {
          this.formSearch.controls.promotions.setValue(false)
        }
      }
      if (params['loyalty_cards']) {
        if (params['loyalty_cards'].toString() === 'true') {
         // this.getSearchResults('lc');
          this.formSearch.controls.loyalty_cards.setValue(true)
        } else {
          this.formSearch.controls.loyalty_cards.setValue(false)
        }
      }

      if (this.formSearch.controls.businesses.value && this.formSearch.controls.businesses.value === true){
         this.getSearchResults('business');
      }

      if (this.formSearch.controls.promotions.value && this.formSearch.controls.promotions.value === true){
        this.getSearchResults('promotion');
      }

      if (this.formSearch.controls.loyalty_cards.value && this.formSearch.controls.loyalty_cards.value === true){
        this.getSearchResults('lc');
      }


      if (params['advanced_filter'] === '1') {
        this.openFilterPopup()
      } else {
        this.closeFilterPopup()
      }

      await this.getCategories()
      this.setTopBarHeight()

    });


    // this.route.params.subscribe(params => {
    //   this.random_listings = []
    //   this.listing_type = params['listing_type'] || '' ;
    //   if (!this.listing_type){
    //     this.listing_type = ''
    //   }
    //   if (this.listing_type === 'TCF'){
    //     this.listing_type = 'lc'
    //   }
    //
    //   //  alert(this.listing_type);
    //
    // })



  }


  async getCategories() {

    const resp = await this.catService.getCategories(this.cat_id).toPromise();

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

  getSearchResultsFromDB(listing_type: string){
    if (listing_type === 'business'){
      this.dbService.getAll(DBTableNames.businessDbTableName).subscribe((storeData) => {
        if (storeData && storeData.length){
          let businessesData = storeData ;
          console.log('Business from DB', businessesData)
          businessesData.forEach((data: any) => {

            console.log(`search from DB for ${this.formSearch.controls.keyword.value}`, data)

            var listing = {
              id: crypto.randomUUID(),
              listing_type: "business",
              business: data
            };

            if (this.formSearch.controls.keyword.value){

              if (data.name && data.name.toLowerCase().includes( this.formSearch.controls.keyword.value.toLowerCase())){
                console.log(`matched from DB for ${this.formSearch.controls.keyword.value}`, data)
                this.random_listings.push(listing)

              } else {

              }

            } else {
              this.random_listings.push(listing)
            }
          })
        }
      })
    }
  }


  async getSearchResults(listing_type: string) {

    this.getSearchResultsFromDB(listing_type);

    try {
      this.progress = true;
      const resp = await this.listingService.getAdvancedSearchResults(listing_type,
          this.formSearch.controls.keyword.value,
          this.formSearch.controls.country.value,
          this.formSearch.controls.city.value,
          this.formSearch.controls.cat_id.value,
         8
          ).toPromise();
      console.log('Search listings', resp);

      if (resp.businesses && resp.businesses.data && resp.businesses.data.length) {
        resp.businesses.data.forEach((business: any) => {
          var listing = {
            id: crypto.randomUUID(),
            listing_type: "business",
            business: business
          };
          this.random_listings.push(listing)
        })
      }
      if (resp.promotions && resp.promotions.data && resp.promotions.data.length) {
        resp.promotions.data.forEach((promotion: any) => {
          var listing = {
            id: crypto.randomUUID(),
            listing_type: "promotion",
            promotion: promotion
          };
          this.random_listings.push(listing)
        })
      }
      if (resp.ads && resp.ads.data && resp.ads.data.length) {
        resp.ads.data.forEach((ad: any) => {
          var listing = {
            id: crypto.randomUUID(),
            listing_type: "ad",
            ad: ad
          };
          this.random_listings.push(listing)
        })
      }
      if (resp.lcs && resp.lcs.data && resp.lcs.data.length) {
        resp.lcs.data.forEach((loyalty_card: any) => {
          var listing = {
            id: crypto.randomUUID(),
            listing_type: "loyalty_card",
            loyalty_card: loyalty_card
          };
          this.random_listings.push(listing)
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
            this.random_listings.push(promos)

          }
          if (business.lcs && business.lcs.length){

            var lcs = {
              id: crypto.randomUUID(),
              listing_type: "featured_lcs",
              lcs: business.lcs,
              business: business
            }
            this.random_listings.push(lcs)

          }
        });

        this.random_listings.push(listing)
      }

      if (resp.featured_promotions && resp.featured_promotions.data && resp.featured_promotions.data.length) {
        var listingPro = {
          id: crypto.randomUUID(),
          listing_type: "featured_promotions",
          promotions: resp.featured_promotions.data,
          current_page: resp.featured_promotions.current_page
        }
        this.random_listings.push(listingPro)
      }

      if (resp.featured_lcs && resp.featured_lcs.data && resp.featured_lcs.data.length) {
        var listingLc = {
          id: crypto.randomUUID(),
          listing_type: "featured_lcs",
          lcs: resp.featured_lcs.data,
          current_page: resp.featured_lcs.current_page
        }
        this.random_listings.push(listingLc)
      }

      this.random_listings =  this.shuffleArray(this.random_listings);
      console.log('Listings loaded', this.random_listings );

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

  onFilterClick(){
    this.router.navigate(['/search-results'], {queryParams: {cat_id: this.cat_id, cat_name: this.cat_name, advanced_filter: 1}})
  }

  openFilterPopup() {
    this.filterPopupStatus = true
  }

  closeFilterPopup(){
    this.filterPopupStatus = false
  }


  onSearchInput($event: any) {
    console.log($event);
    this.router.navigate(['/search-results'], {queryParams: {cat_id: $event.cat_id, cat_name: $event.cat_name, keyword: $event.keyword, country: $event.country , city: $event.city, businesses: $event.businesses, promotions: $event.promotions, loyalty_cards: $event.loyalty_cards, advanced_filter: 0}})
    this.closeFilterPopup()
  }

  viewByCategory($event: Category) {
    this.router.navigate(['/search-results'], {queryParams: {cat_id: $event.id, cat_name: $event.name, keyword: this.formSearch.controls.keyword.value, country: this.formSearch.controls.country.value , city: this.formSearch.controls.city.value, businesses: this.formSearch.controls.businesses.value, promotions: this.formSearch.controls.promotions.value, loyalty_cards: this.formSearch.controls.loyalty_cards.value, advanced_filter: 0}})
  }
}
