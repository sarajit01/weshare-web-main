import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {PlanService} from "../../services/plan.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {

  progress = false ;
  saveProgress = false ;
  planId : any ;
  plan : any | undefined;
  features : any | undefined ;

  formPlan = this.fb.group({
    plan_id : ['' , Validators.required] ,
    name : ['' , Validators.required ] ,
    price : ['' , [Validators.required]] ,
    currency :  ['USD', [ Validators.required]] ,
    free_trial_enabled : [''] ,
    free_trial_duration : [''] ,
    duration : ['' , Validators.required] ,
    discount : [''],
    features : [''] ,
    status : ['']
  });

  constructor(
    private fb : UntypedFormBuilder ,
    private planService : PlanService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.planId = paramMap.get('plan_id');
      this.getPlanDetails();
    });
  }

  async getPlanDetails() {

    this.progress = true ;
    const data = await this.planService.getPlanDetailsById(this.planId);
    this.progress = false ;

    console.log(data);
    if(data.plan !== null){
      this.plan = data.plan ;
      this.formPlan.controls.plan_id.setValue(this.plan.id);
      this.formPlan.controls.name.setValue(this.plan.name);
      this.formPlan.controls.price.setValue(this.plan.price);
      this.formPlan.controls.discount.setValue(this.plan.discount);
      this.formPlan.controls.duration.setValue(this.plan.duration);
      this.formPlan.controls.free_trial_enabled.setValue(this.plan.free_trial_enabled);
      this.formPlan.controls.free_trial_duration.setValue(this.plan.free_trial_duration);
      this.formPlan.controls.status.setValue(this.plan.status);

    }
    if(data.features !== null){
      this.features = data.features ;
      this.formPlan.controls.features.setValue(this.features);
    }

  }

  async saveSettings() {

    if(! this.formPlan.valid){
      this.formPlan.markAllAsTouched();

    } else {

      try {
        this.saveProgress = true;
        console.log('form plan data',this.formPlan.value);
        const data = await this.planService.saveSettings(this.formPlan.value).toPromise();
        console.log(data);
        if (data.success) {
          this.sweetAlert.successNotification('Settings updated !' , data.success);

          await this.getPlanDetails();
        }
        if (data.error) {
          this.snackbarService.openSnackBar(data.error);
        }
      } catch (ex) {
        console.log(ex);
        this.snackbarService.openSnackBar('Something went wrong !');

      } finally {
        this.saveProgress = false;
      }

    }

  }

}
