import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-business-manager',
  templateUrl: './business-manager.component.html',
  styleUrls: ['./business-manager.component.css']
})
export class BusinessManagerComponent implements OnInit {

  progress = false ;
  routes = ROUTES;
  listings : any = [] ;
  listingType: string | undefined ;
  search = '';
  status: string = 'Pending';
  business_name: any;

  constructor(

    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    public route : ActivatedRoute

  ) {


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.listingType = paramMap.get('listing_type') || 'business';
      this.getListings();
    })
  }

  async getListings() {

    console.log(this.status);
    this.listings = [];

    try {
      this.progress = true ;
      const resp = await this._listingService.getListing(this.listingType || 'business', '',this.search , this.status).toPromise();
      console.log(resp);
      if(resp.data){
        this.listings = resp.data ;
        console.log(this.listings);
      }

    } catch ($ex) {
      this.snackbarService.openSnackBar('Failed to get data');
    } finally {
      this.progress = false ;

    }

  }



}
