import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {PaymentService} from "../../services/payment.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-bank-payments',
  templateUrl: './bank-payments.component.html',
  styleUrls: ['./bank-payments.component.css']
})
export class BankPaymentsComponent implements OnInit {

  dataProgress: any = false;
  payments:any = [] ;
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
    this.getBankPayments();
  }

  async getBankPayments() {
    this.dataProgress = true;
    try {
      const resp = await this.paymentService.getBankPayments().toPromise();
      console.log(resp);
      if(resp.payments){
        this.payments = resp.payments ;
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

  async approveBankPayment(paymentId: any) {

    try {
      const resp = await this.paymentService.approveBankPayment(paymentId).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlertService.successNotification('Payment approved',resp.success);
        await this.getBankPayments();
      }

      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification(
        'Failed',
        'Something went wrong !',
      );
    } finally {

    }
  }

  async denyBankPayment(paymentId: any) {

    try {
      const resp = await this.paymentService.denyBankPayment(paymentId).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlertService.errorNotification('Payment Denied',resp.success);
        await this.getBankPayments();
      }

      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification(
        'Failed',
        'Something went wrong !',
      );
    } finally {

    }
  }

}
