import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-promotion-results',
  templateUrl: './promotion-results.component.html',
  styleUrls: ['./promotion-results.component.css']
})
export class PromotionResultsComponent implements OnInit {
  promotions : any | undefined;
  category: any | undefined ;
  categories: any;
  sort: boolean = false;
  filter: boolean = false;
  sortBy: any = 'latest';
  minPrice = '';
  maxPrice = '' ;


  constructor(
    private _listingService: ListingService,
    private catService: CategoryService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getCat(paramMap.get('cat_id') || '');
      this.getPromotionsListing()
    });
  }


  toggleSortOptions(){
    this.sort = !this.sort ;
  }

  toggleFilterOptions(){
    this.filter = !this.filter ;
  }

  async getPromotionsListing() {

    try {

      const resp = await this._listingService.getListing('promotion','','', '',this.sortBy, this.minPrice, this.maxPrice).toPromise();
      console.log(resp);
      if(resp.data){

        this.promotions = resp.data ;
        console.log(this.promotions);
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
