import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {

  promotion: any | undefined ;
  progress = false;
  business: any | undefined ;
  listing_type: string | undefined ;
  listing_id: string | null | undefined ;
  gallery: any[] = [] ;
  media: any ;
  currentIndex: any = 0;


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private listingService: ListingService ,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.listing_type = paramMap.get('listing_type') || 'business' ;
      this.listing_id = paramMap.get('id')  ;
      if(this.listing_type === 'business'){
        this.getBusinessDetails(this.listing_id);
      } else if(this.listing_type === 'promotion') {
        this.getPromotionDetails(this.listing_id);
      }
    })
  }

  async getBusinessDetails(business_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessDetails(business_id).toPromise();
      console.log(resp);

      if (resp.business) {
        this.business = resp.business ;
        if(this.business.gallery){
          this.gallery = this.business.gallery ;
          this.currentIndex = 0;
          if(this.gallery[this.currentIndex]){
            this.media = this.gallery[this.currentIndex];
          }
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

  async getPromotionDetails(promotion_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getPromotionDetails(promotion_id).toPromise();
      console.log(resp);

      if (resp.promotion && resp.promotion.business) {
        this.promotion = resp.promotion ;
        this.business = resp.promotion.business ;
        if(this.business.gallery){
          this.gallery = this.business.gallery ;
          this.currentIndex = 0;
          if(this.gallery[this.currentIndex]){
            this.media = this.gallery[this.currentIndex];
          }
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


  prev() {
    this.currentIndex = this.currentIndex -1 ;
    this.setMedia(this.currentIndex);
  }

  setMedia(index: any){
    if(this.gallery[index]){
      this.media = this.gallery[index];
    } else {
      this.currentIndex = 0 ;
    }
  }

  next() {
    this.currentIndex = this.currentIndex +1 ;
    this.setMedia(this.currentIndex);
  }
}
