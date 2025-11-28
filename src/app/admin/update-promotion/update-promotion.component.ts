import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-update-promotion',
  templateUrl: './update-promotion.component.html',
  styleUrls: ['./update-promotion.component.css']
})
export class UpdatePromotionComponent implements OnInit {

  promotion: any | undefined ;
  progress = false;

  constructor(
    private listingService: ListingService ,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getPromotionDetails(paramMap.get('promotion_id') || '');
    })
  }

  async getPromotionDetails(promotion_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getPromotionDetails(promotion_id).toPromise();
      console.log(resp);

      if (resp.promotion) {
        this.promotion = resp.promotion ;
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

}
