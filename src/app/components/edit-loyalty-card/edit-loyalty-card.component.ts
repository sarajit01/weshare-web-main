import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-edit-loyalty-card',
  templateUrl: './edit-loyalty-card.component.html',
  styleUrls: ['./edit-loyalty-card.component.css']
})
export class EditLoyaltyCardComponent implements OnInit {


  lc: any | undefined ;
  progress = false;

  constructor(
    private listingService: ListingService ,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.getLcDetails(paramMap.get('lc_id') || '');
    })
  }

  async getLcDetails(id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getLC(id).toPromise();
      console.log(resp);

      if (resp.loyalty_card) {
        this.lc = resp.loyalty_card ;
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
