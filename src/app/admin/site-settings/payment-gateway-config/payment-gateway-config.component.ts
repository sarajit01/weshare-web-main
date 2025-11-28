import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {SiteSettingsService} from "../../../services/site-settings.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";
import {PaymentService} from "../../../services/payment.service";

@Component({
  selector: 'app-payment-gateway-config',
  templateUrl: './payment-gateway-config.component.html',
  styleUrls: ['./payment-gateway-config.component.css']
})
export class PaymentGatewayConfigComponent implements OnInit {

  progress: boolean = false;
  paymentGateways: any = {} ;
  constructor(
      private fb : UntypedFormBuilder ,
      private _siteSettingsService: SiteSettingsService,
      private _snackbarService: SnackbarService,
      private _paymentService: PaymentService,
      private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.get();
  }

  /*
  `cloud_name`, `cloud_api`, `cloud_preset`, `pusher_api`, `pusher_secret`, `pusher_cluster`, `fb_app_id`, `fb_app_secret`, `g_client_id`, `g_client_secret`, `g_map_key`
   */

  async get() {
    try {
      this.progress = true ;
      const resp = await this._paymentService.getPaymentGateways().toPromise();
      if(resp.length){
        this.paymentGateways = resp ;
        console.log(this.paymentGateways);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async save(gateway: any) {
    try {
      this.progress = true ;
      let resp ;
      resp = await this._paymentService.savePaymentGateway(gateway).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
      }
      if(resp.error){
        this._snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }
  }



}
