import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {PaymentService} from "../../services/payment.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-business-claims',
  templateUrl: './business-claims.component.html',
  styleUrls: ['./business-claims.component.css']
})
export class BusinessClaimsComponent implements OnInit {

  dataProgress: any = false;
  claims:any = [] ;
  constructor(
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public listingService: ListingService ,
    public sweetAlertService : SweetAlertService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBusinessClaims();
  }

  async getBusinessClaims() {
    this.dataProgress = true;
    try {
      const resp = await this.listingService.getBusinessClaims().toPromise();
      console.log(resp);
      if(resp.claims){
        this.claims = resp.claims ;
      }
    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification(
        'Failed',
        'Something went wrong !',
      );
    } finally {
      this.dataProgress = false;
    }
  }

  async approve(claim_id: any) {
    this.dataProgress = true;
    try {
      const resp = await this.listingService.approveBusinessClaim(claim_id).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlertService.successNotification('Assigned successfully' , resp.success);
        this.getBusinessClaims();
      }
      if(resp.error){
        this.sweetAlertService.errorNotification(
          'Failed',
           resp.error
        );
      }

    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification(
        'Failed',
        'Something went wrong !',
      );
    } finally {
      this.dataProgress = false;
    }
  }




}
