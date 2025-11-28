import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-edit-business-ad',
  templateUrl: './edit-business-ad.component.html',
  styleUrls: ['./edit-business-ad.component.css']
})
export class EditBusinessAdComponent implements OnInit {

  businessAd: any | undefined ;
  progress = false;

  constructor(
    private listingService: ListingService ,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getBusineessAdDetails(paramMap.get('ad_id') || '');
    })
  }

  async getBusineessAdDetails(ad_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessAdDetails(ad_id).toPromise();
      console.log(resp);

      if (resp.business_ad) {
        this.businessAd = resp.business_ad ;
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
