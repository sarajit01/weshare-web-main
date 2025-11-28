import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-business-result',
  templateUrl: './business-result.component.html',
  styleUrls: ['./business-result.component.css']
})
export class BusinessResultComponent implements OnInit {

  businesses : any | undefined;
  category: any | undefined ;
  categories: any;
  sort: boolean = false;
  filter: boolean = false;

  sortBy: any = 'latest' ;
  minPrice:any = '';
  maxPrice:any = '';
  city: string = ''
  category_search: string = ''
  search: string = ''

  constructor(
     private _listingService: ListingService,
     private catService: CategoryService,
     private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getCat(paramMap.get('cat_id') || '');
    //  this.getBusinessListings();
    });

    this.route.queryParams.subscribe(params => {
      this.category_search = params['category'] || '';
      this.search = params['search'] || '';
      this.city = params['city'] || '';
      this.getBusinessListings();
    });

  }

  async getBusinessListings() {
  //  console.log('Searching listing',this.search);
    try {

      const resp = await this._listingService.searchListing('business',
        '',
         this.search,
        'approved', this.city, this.category_search, this.sortBy, this.minPrice, this.maxPrice).toPromise();
      console.log('from api', resp);
      if(resp.data){

        this.businesses = resp.data ;
        console.log('search result from API',this.businesses);
      }

    } catch ($ex) {

    }

  }

  async getCat(id: any) {

    try {

      const resp = await this.catService.getCategory(id).toPromise();
      console.log(resp);
      if (resp.category) {
        this.category = resp.category ;
      }

    } catch ($ex) {
      console.log($ex);
    }

  }

  toggleSortOptions(){
    this.sort = !this.sort ;
  }

  toggleFilterOptions(){
    this.filter = !this.filter ;
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



}
