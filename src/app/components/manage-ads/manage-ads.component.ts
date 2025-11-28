import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-ads',
  templateUrl: './manage-ads.component.html',
  styleUrls: ['./manage-ads.component.css']
})
export class ManageAdsComponent implements OnInit {
  routes = ROUTES;
  ads : [] | undefined ;
  search = '';

  constructor(

    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService,
    private router: Router


  ) { }

  ngOnInit(): void {
    this.getMyAdListings();
  }

  async getMyAdListings() {

    try {

      const resp = await this._listingService.getListing('ad',this.authService.getUserID(),this.search).toPromise();
      console.log(resp);
      if(resp.data){
        this.ads = resp.data ;
        console.log(this.ads);
      }

    } catch ($ex) {
      console.log($ex);
    }

  }

  backPrev() {
    this.router.navigate(['/business/dashboard']);

  }

}
