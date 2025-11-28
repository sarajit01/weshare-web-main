import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CustomerClaimService} from "../../services/customer-claim.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-customer-claims',
  templateUrl: './customer-claims.component.html',
  styleUrls: ['./customer-claims.component.css']
})
export class CustomerClaimsComponent implements OnInit {

  claims: any = [] ;
  progress: boolean = false;

  constructor(
    private _authService: AuthService,
    private _customerClaimService: CustomerClaimService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getClaims().then(r => console.log('Claims promise', r));
  }

  async getClaims() {
    try {
      this.progress = true;
      const resp = await this._customerClaimService.getClaims(this._authService.getUserID()).toPromise();
      console.log(resp);

      if (resp.customer_claims) {
        this.claims = resp.customer_claims;
      } else {
        this._snackBarService.openSnackBar("Failed to load claims");
      }

    } catch ($exception: any) {
      this._snackBarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }
  }

}
