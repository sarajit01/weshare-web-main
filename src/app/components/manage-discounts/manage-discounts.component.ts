import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css']
})
export class ManageDiscountsComponent implements OnInit {

  routes = ROUTES;
  promotions: any = [];
  search = '';
  business_name: any;

  constructor(

      private fb : UntypedFormBuilder ,
      private _listingService : ListingService ,
      private snackbarService : SnackbarService ,
      public authService : AuthService ,
      public sweetAlertService : SweetAlertService,
      private router: Router


  ) { }

  ngOnInit(): void {
    this.getMyPromoListings();
  }

  async getMyPromoListings() {

    try {

      const resp = await this._listingService.getListing('promotion',this.authService.getUserID(),this.search).toPromise();
      console.log(resp);
      if(resp.data){

        this.promotions = resp.data ;
        console.log(this.promotions);
      }

    } catch ($ex) {

    }

  }

  backPrev() {
    this.router.navigate(['/business/dashboard']);

  }

}
