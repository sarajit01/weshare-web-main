import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {PlanService} from "../../services/plan.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ROUTES} from "../../core/routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css']
})
export class SelectPlanComponent implements OnInit {

  ROUTES = ROUTES ;
  plans : any = [] ;
  progress: any = false ;
  my_plan :any = undefined ;
  free_trial_used: any = undefined ;
  saveProgress: any = undefined;

  constructor(
    private fb : UntypedFormBuilder ,
    private planService : PlanService ,
    public snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private sweetAlert : SweetAlertService ,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getPlans();
  }

  async getPlans() {
    try {
      this.progress = true ;
      const resp = await this.planService.getPlans().toPromise();
      console.log(resp);
      if(resp.plans){
        this.plans = resp.plans ;
      }
      if(resp.my_plan){
        this.my_plan = resp.my_plan ;
      }

      if(resp.free_trial_used){
        this.free_trial_used = resp.free_trial_used ;
      }


    } catch ($ex) {

    } finally {
      this.progress = false ;
    }

  }

  async onSelect(plan: any, useTrial: boolean = false) {

    if (useTrial) {
        this.router.navigate(['/' + ROUTES.business.pay], {queryParams: {plan_id: plan.id , use_trial: '1'}});
    } else {
        this.router.navigate(['/' + ROUTES.business.pay], {queryParams: {plan_id: plan.id}});

    }

    // if (useTrial) {
    //   await this.subscribe(plan , '1');
    // } else {
    //   if (plan.price === 0) {
    //     await this.subscribe(plan , '');
    //
    //   } else {
    //     this.router.navigate(['/' + ROUTES.business.pay], {queryParams: {plan_id: plan.id}});
    //   }
    // }

  }


  async subscribe(plan: any , isTrial: any = '') {

    try {
      this.saveProgress = true;
      const data = await this.planService.subscribe({
        user_id : this.authService.getUserID() ,
        plan_id : plan.id ,
        duration : plan.duration ,
        is_trial : isTrial
      }).toPromise();
      console.log(data);
      if (data.success) {
        this.sweetAlert.successNotification('Successful', data.success);
        await this.getPlans();
      }

      if (data.error) {
        this.sweetAlert.errorNotification('Failed', data.error);
        await this.getPlans();
      }
    } catch (e) {
      this.snackbarService.openSnackBar('Something went wrong ! Failed to purchase plan !');
    } finally {
      this.saveProgress = false;
    }
  }


  async unsubscribe() {
    let conf = confirm('Are you sure to cancel subscription?');
    if (conf) {
      try {
        this.saveProgress = true;
        const data = await this.planService.unsubscribe().toPromise();
        console.log(data);
        if (data.success) {
          this.snackbarService.openSnackBar(data.success)
          setTimeout(() => {
            window.location.reload();
          }, 2000)
          //await this.getPlans();
        }

        if (data.error) {
          this.snackbarService.openSnackBar(data.error)
        }
      } catch (e) {
        this.snackbarService.openSnackBar('Something went wrong ! Failed to purchase plan !');
      } finally {
        this.saveProgress = false;
      }
    }
  }

}
