import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {

  business: any | undefined ;
  progress = false;

  constructor(
    private listingService: ListingService ,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getBusinessDetails(paramMap.get('id') || '');
    })
  }

  async getBusinessDetails(business_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessDetails(business_id).toPromise();
      console.log(resp);

      if (resp.business) {
        this.business = resp.business ;
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
