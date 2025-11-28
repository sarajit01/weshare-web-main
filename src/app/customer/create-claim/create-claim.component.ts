import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {CustomerClaimService} from "../../services/customer-claim.service";

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.css']
})
export class CreateClaimComponent implements OnInit {

  progress = false;

  claimForm = this.fb.group({
    business_id: this.data.business.id,
    claim_type: this.data.claim_type,
    customer_id : this.authService.getUserID() ,
    offer :  [''] ,
    discount: [''],
    description :  [''] ,
  });


  constructor(
    private dialogRef: MatDialogRef<CreateClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb : UntypedFormBuilder ,
    private authService: AuthService,
    private _customerClaimService: CustomerClaimService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  async submitClaim() {
    if (!this.claimForm.valid) {
      this.claimForm.markAllAsTouched();
      this.snackbarService.openSnackBar('Please correct all the fields');
      return;
    }

    console.log(this.claimForm.value);

    try {
      this.progress = true;
      const resp = await this._customerClaimService.saveClaim(this.data.business.id, this.claimForm.value).toPromise();
      console.log(resp);

      if (resp.success) {
        this.sweet.successNotification('Claim sent successfully', resp.success);
        this.closeModal();

      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to send', resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }


  }
}
