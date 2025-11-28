import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";
import {SweetAlertService} from "../../services/sweet-alert.service";

@Component({
  selector: 'app-delegate-access',
  templateUrl: './delegate-access.component.html',
  styleUrls: ['./delegate-access.component.css']
})
export class DelegateAccessComponent implements OnInit {

  delegateAccess: any[] = [] ;
  isLoading = false

  constructor(
    private listingService : ListingService ,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route : ActivatedRoute,
    private sweet: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getDelegateAccess();
  }



  async getDelegateAccess() {
    this.isLoading = true ;
    try {
      const resp = await this.listingService.getDelegateAccess(this.authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.businesses) {
        this.delegateAccess = resp.businesses;
      }
    } catch (e){

    } finally {
      this.isLoading = false ;
    }

  }


}
