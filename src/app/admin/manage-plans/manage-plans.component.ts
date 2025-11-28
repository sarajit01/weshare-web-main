import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {PlanService} from "../../services/plan.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ROUTES} from "../../core/routes";

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.css']
})
export class ManagePlansComponent implements OnInit {
   ROUTES = ROUTES ;
   saveProgress = false;
   deleteProgress = false ;
   plans : any = [] ;

  constructor(
    private fb : UntypedFormBuilder ,
    private planService : PlanService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private sweetAlert : SweetAlertService ,

  ) { }


  ngOnInit(): void {
    this.getPlans();
  }

  async getPlans() {
    try {
      this.saveProgress = true ;
      const resp = await this.planService.getPlans().toPromise();
      console.log('plans');
      console.log(resp);
      if(resp.plans){
        this.plans = resp.plans ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.saveProgress = false ;
    }

  }

  deleteConfirmation(plan_id: any){
    Swal.fire({
      title: 'Are you sure to delete this plans ?',
      text: 'All data related to this plan will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.delete(plan_id);

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async delete(plan_id: any) {
    try {
      this.deleteProgress = true ;
      const resp = await this.planService.deletePlan(plan_id).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlert.successNotification('Plan deleted !' , resp.success);
        await this.getPlans();
      }
      if(resp.error){
        this.sweetAlert.errorNotification('Plan could not be deleted !' , resp.error);
      }

    } catch ($ex) {
      this.sweetAlert.errorNotification('Plan could not be deleted !' , '');

    } finally {
      this.deleteProgress = false ;
    }

  }

}
