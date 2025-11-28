import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {CountryService} from "../../services/country.service";
import {NgxIndexedDBService} from "ngx-indexed-db";
import DBTableNames from "../../schemas/dbTableNames.schema";

@Component({
  selector: 'app-search-filter-bottom-sheet',
  templateUrl: './search-filter-bottom-sheet.component.html',
  styleUrls: ['./search-filter-bottom-sheet.component.css']
})
export class SearchFilterBottomSheetComponent implements OnInit {
  progress: boolean = false;
  catSuggestionIsLoading: boolean = false
  countries: any = [];
  categories: any = [];
  suggestedCategories: any = []
  selectedCountry: any = null ;
  @Input() searchParams: any = null
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
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
  private isTyping: boolean = false;
  private typingTimeout: any;


  constructor(
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet,
      private listingService: ListingService,
      private router: Router,
      private snackbarService: SnackbarService,
      private fb: UntypedFormBuilder,
      private catService: CategoryService,
      private _countryService: CountryService,
      public dbService: NgxIndexedDBService

  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.getCategories();
    if (this.searchParams){
      console.log(this.searchParams);
      this.formSearch.controls.keyword.setValue(this.searchParams.keyword)
      this.formSearch.controls.country.setValue(this.searchParams.country)
      this.formSearch.controls.city.setValue(this.searchParams.city)
      this.formSearch.controls.cat_id.setValue(this.searchParams.cat_id)

      if (this.searchParams.cat_id){
        this.getSuggestedCategories();
      }

      this.formSearch.controls.cat_name.setValue(this.searchParams.cat_name)

      if (this.searchParams.businesses){
        this.formSearch.controls.businesses.setValue(true)
      } else {
        this.formSearch.controls.businesses.setValue(false)
      }

      if (this.searchParams.promotions){
        this.formSearch.controls.promotions.setValue(true)
      } else {
        this.formSearch.controls.promotions.setValue(false)
      }
      if (this.searchParams.loyalty_cards){
        this.formSearch.controls.loyalty_cards.setValue(true)
      } else {
        this.formSearch.controls.loyalty_cards.setValue(false)
      }

    }
  }

  async getCountries() {
    try {
      this.progress = true ;
      const resp = await this._countryService.getAll().toPromise();
      if(resp.countries){
        this.countries = resp.countries ;
        if (!this.formSearch.controls.country.value){
          if (this.countries[0]) {
            this.selectedCountry = this.countries[0]
          }
        } else {
          if (this.countries.filter((country: any) => country.country_code === this.formSearch.controls.country.value)[0]){
            this.selectedCountry = this.countries.filter((country: any) => country.country_code === this.formSearch.controls.country.value)[0]
          }
        }

        console.log('countries',this.countries)
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  onClose(){
    this.onClosed.emit(true)
  }

  onSearch(){
    this.search.emit(this.formSearch.value);
  }

  selectCountry() {
    if (this.formSearch.controls.country.value) {
      //  this.formSearch.controls.country.setValue(value.country_name);
      this.selectedCountry = this.countries.filter((country: any) => country.country_code === this.formSearch.controls.country.value)[0];
    }
  }

  onSelectCategory(cat: any){
    this.formSearch.controls.cat_id.setValue(cat.id) ;
    this.getSuggestedCategories();
    this.formSearch.controls.cat_name.setValue(cat.name) ;
   // this.search.emit(this.formSearch.value)

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

  async getCategories() {

    this.dbService.getAll(DBTableNames.categoryDbTableName).subscribe((storeData) => {
      if (storeData){
        this.categories = storeData
      }
    });

    try {
      const resp = await this.catService.getCategories('').toPromise();
      console.log(resp);
      if (resp.length) {
        this.categories = resp;
      }
    } catch (exception){

    } finally {

    }
  }

  async getSuggestedCategories() {
    try {
      this.catSuggestionIsLoading = true
      const resp = await this.catService.getCategoriesByHint(this.formSearch.controls.keyword.value, this.formSearch.controls.cat_id.value).toPromise();
      console.log(resp);
      if (resp.length) {
        this.suggestedCategories = resp;
      }
    } catch (exception){

    } finally {
      this.catSuggestionIsLoading = false
    }
  }

  loadCategorySuggestions() {
    this.isTyping = true;
    if (this.typingTimeout !== null && this.typingTimeout !== undefined){
      try {
        clearTimeout(this.typingTimeout)
        console.log('Cleared timeout')
      } catch (ex){
        console.log(ex)
      }
    }
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
      this.getSuggestedCategories()
    }, 1500)

  }




}
