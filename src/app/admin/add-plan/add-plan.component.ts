import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {FileUploadService} from "../../services/file-upload.service";
import {IconService} from "../../services/icon.service";
import {CategoryService} from "../../services/category.service";
import {PlanService} from "../../services/plan.service";

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  saveProgress = false ;

  formAddPlan = this.fb.group({
    name : ['' , Validators.required ] ,
    price : ['' , [Validators.required]] ,
    currency :  ['USD', [ Validators.required]] ,
    free_trial_enabled : [''] ,
    free_trial_duration : [''] ,
    duration : ['' , Validators.required] ,
    discount : [''] ,
    status : ['']
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
  }

  async addPlan() {

    if (!this.formAddPlan.valid) {
      this.formAddPlan.markAllAsTouched();
      return;
    }
    console.log(this.formAddPlan.value);

    try {
      this.saveProgress = true ;
      const resp = await this.planService.createPlan(this.formAddPlan.value).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweetAlert.successNotification('Plan created !', resp.success);
      }
      if (resp.error) {
        this.sweetAlert.errorNotification('Plan creation failed !', resp.error);
      }
    } catch ($ex: any) {
      this.sweetAlert.errorNotification('Plan creation failed !', $ex.statusText);
    } finally {
      this.saveProgress = false ;
    }

  }

}
