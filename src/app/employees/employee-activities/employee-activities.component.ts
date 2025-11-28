import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-employee-activities',
  template: `
    <p>
      employee-activities works!
    </p>
  `,
  styles: [
  ]
})
export class EmployeeActivitiesComponent implements OnInit {

  progress = false;

  form = this.fb.group({
    business_id: this.data.business.id,
    listing_type: ['', [Validators.required]],
    listing_id: ['', [Validators.required]],
    referrer_id: [''],
    consumption_amount: ['', [Validators.required]],
    search_card : [''],
    customer_id : [ this.data.customer_id || '', Validators.required] ,
    employee_id : [ this.authService.getUserID()] ,
    reward_type : [''] ,
  });
  business: any = this.data.business;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb : UntypedFormBuilder ,
    public authService: AuthService,
    public snackbarService: SnackbarService,
    public listingService: ListingService
  ) { }

  ngOnInit(): void {

  }


  closeModal(success: boolean): void {
    // @ts-ignore
    if(this.dialogRef){
      // @ts-ignore
      this.dialogRef.close(success);
    }
  }

  async submitData() {
    if (!this.form.valid) {
      this.snackbarService.openSnackBar('Please correct all the fields');
      return;
    }

    console.log(this.form.value);

    try {
      this.progress = true;

      let resp ;
      if(! this.data.debit){
         resp = await this.listingService.saveCustomerReward(this.form.value).toPromise();
      } else {
        resp = await this.listingService.debitCustomerReward(this.form.value).toPromise();
      }
      console.log(resp);
      this.handleResp(resp);
      if(resp.reward && resp.reward.id){
        if(resp.reward.reward_type === 'prize'){
          this.snackbarService.openSnackBar(resp.reward.credit+' '+this.business.currency+' credited to customer account successfully');
        } else {
          this.snackbarService.openSnackBar(resp.reward.credit+' points credited to customer account successfully');
        }
        this.form.controls['consumption_amount'].setValue('');
        this.form.controls['listing_type'].setValue('');
        this.form.controls['listing_id'].setValue('');
        this.form.controls['referrer_id'].setValue('');
        this.form.controls['customer_id'].setValue('');

      }

    } catch ($exception: any) {
      this.handleError($exception.message);

    } finally {
      this.progress = false;

    }


  }

  handleResp(resp: any){
    if (resp.success) {
      this.snackbarService.openSnackBar(resp.success);
      this.closeModal(true);

    }
    if (resp.error) {
      this.handleError(resp.error);
    }
    if (resp.errors && resp.errors[0]) {
      this.handleError(resp.errors[0]);
    }
  }

  handleError(error: any){
    this.snackbarService.openSnackBar(error)

  }




}
