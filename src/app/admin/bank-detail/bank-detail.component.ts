import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {FileUploadService} from "../../services/file-upload.service";
import {IconService} from "../../services/icon.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {
  saveProgress: any = false;
  dataProgress: any = false ;
  bank: any = undefined ;

  formBank = this.fb.group({
    payment_method_id : [''] ,
    bank_name :  ['', [ Validators.required]] ,
    branch :  ['', [ Validators.required]] ,
    account_no :  ['', [ Validators.required]] ,
    account_name :  ['', [ Validators.required]] ,
    routing :  ['', [ Validators.required]] ,

  });
  constructor(
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public paymentService: PaymentService ,
    public sweetAlertService : SweetAlertService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBank();
  }

  async saveBank() {
    if(! this.formBank.valid){
      this.formBank.markAllAsTouched();
    } else {
      this.saveProgress = true;
      try {

        console.log(this.formBank.value);
        const resp = await this.paymentService.saveOfflineMethod(this.formBank.value).toPromise();
        console.log(resp);
        if (resp.success) {
          this.sweetAlertService.successNotification('Saved successfully !', resp.success);
          await this.getBank();
        }

        if (resp.error) {
          this.sweetAlertService.errorNotification('Failed', resp.error);
        }


      } catch ($ex) {

        console.log($ex);
        this.sweetAlertService.errorNotification(
          'Failed',
          'Something went wrong !',
        );

      } finally {
        this.saveProgress = false;
      }
    }

  }

  async getBank() {

      this.dataProgress = true;
      try {

        const resp = await this.paymentService.getOfflineMethod().toPromise();
        console.log(resp);
        if (resp.method && resp.method !== null) {
          this.formBank.controls.payment_method_id.setValue(resp.method.id);
          this.formBank.controls.bank_name.setValue(resp.method.bank_name);
          this.formBank.controls.branch.setValue(resp.method.branch);
          this.formBank.controls.account_no.setValue(resp.method.account_no);
          this.formBank.controls.account_name.setValue(resp.method.account_name);
          this.formBank.controls.routing.setValue(resp.method.routing);

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
