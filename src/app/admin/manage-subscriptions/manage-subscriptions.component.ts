import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ROUTES} from "../../core/routes";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {PlanService} from "../../services/plan.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";

@Component({
  selector: 'app-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  styleUrls: ['./manage-subscriptions.component.css']
})
export class ManageSubscriptionsComponent implements OnInit {

  ROUTES = ROUTES ;
  saveProgress = false;
  deleteProgress = false ;
  subscriptions : any = [] ;

  progress = false ;

  formFilter = this.fb.group({
    user_id : ['']
  });

  constructor(
    private fb : UntypedFormBuilder ,
    private planService : PlanService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private sweetAlert : SweetAlertService ,
  ) { }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  async getSubscriptions() {
    try {
      this.progress = true ;
      const resp = await this.planService.subscriptions(this.formFilter.controls.user_id.value).toPromise();
      console.log(resp);
      if(resp.subscriptions){
        this.subscriptions = resp.subscriptions ;
      }
    } catch ($ex) {

    } finally {
      this.progress = false ;
    }

  }

  async renew(Id: any) {
    try {
      this.progress = true ;
      const resp = await this.planService.renewSubscription(Id).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlertService.successNotification('Renewed successfully !' , resp.success);
        await this.getSubscriptions();
      }
      if(resp.error){
        this.sweetAlertService.errorNotification('Renewal Failed !' , resp.error);
      }
    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification('Something went wrong' , '');
    } finally {
      this.progress = false ;
    }

  }

  async updateSubscriptionStat(userId: any , status: string) {
    try {
      this.progress = true ;
      const resp = await this.planService.updateSubscriptionStat(userId , status).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlertService.successNotification('Subscription status updated successfully !' , resp.success);
        await this.getSubscriptions();

      }
      if(resp.error){
        this.sweetAlertService.errorNotification('Status Failed to update !' , resp.error);
      }
    } catch ($ex) {

      this.sweetAlertService.errorNotification('Something went wrong' , '');
    } finally {
      this.progress = false ;
    }

  }

}
