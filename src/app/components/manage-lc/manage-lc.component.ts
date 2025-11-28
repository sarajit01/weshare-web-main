import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTES} from "../../core/routes";
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-lc',
  templateUrl: './manage-lc.component.html',
  styleUrls: ['./manage-lc.component.css']
})
export class ManageLCComponent implements OnInit, OnDestroy {


  routes = ROUTES;
  lcs : any[] = [] ;
  search = '' ;

  constructor(

    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService,
    public listingService: ListingService,
    private router: Router

  ) { }

  ngOnInit(): void {
    document.body.classList.add('overflow-y-scroll');
    this.getLCs()
  }

  async getLCs() {

    try {

      const resp = await this._listingService.getLCAll(this.authService.getUserID(), this.search).toPromise();
      console.log(resp);
      if(resp.loyalty_cards){
        this.lcs = resp.loyalty_cards ;
        console.log(this.lcs);
      }

    } catch ($ex) {

    }

  }


  deleteConfirmation(id: any){
    Swal.fire({
      title: 'Are you sure to delete this Loyalty Card ?',
      text: 'All data related to this Loyalty card will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.deleteLoyaltyCard(id);

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async deleteLoyaltyCard(id: any) {

    try {

      const resp = await this.listingService.deleteLC(id).toPromise();
      console.log(resp);
      if(resp.success){
        Swal.fire(
          'Deleted !',
          'Loyalty Card has been deleted successfully.',
          'success'
        );

        this.getLCs();

      }

      if(resp.error){
        Swal.fire(
          'Failed',
          'Unable to delete the Loyalty Card !',
          'warning'
        )
      }


    } catch ($ex) {

      console.log($ex);
      Swal.fire(
        'Failed',
        'Something went wrong !',
        'warning'
      )

    }

  }


  backPrev() {
    this.router.navigate(['/business/dashboard']);

  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-y-scroll');

  }


}
