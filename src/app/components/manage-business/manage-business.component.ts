import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ROUTES} from "../../core/routes";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from "@angular/router";
@Component({
  selector: 'app-manage-business',
  templateUrl: './manage-business.component.html',
  styleUrls: ['./manage-business.component.css']
})
export class ManageBusinessComponent implements OnInit, OnDestroy {

  routes = ROUTES;
  businesses : [] | undefined ;
  search = '' ;

  constructor(

    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService,
    private router: Router

  ) { }

  ngOnInit(): void {
    document.body.classList.add('overflow-y-scroll');

    this.getMyBusinessListings()
  }

  async getMyBusinessListings() {

    try {

      const resp = await this._listingService.getListing('business',this.authService.getUserID() , this.search).toPromise();
      console.log(resp);
      if(resp.data){
        this.businesses = resp.data ;
        console.log(this.businesses);
      }

    } catch ($ex) {

    }

  }


  backPrev() {
    this.router.navigate(['/business/dashboard']);

  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-y-scroll');

  }
}
