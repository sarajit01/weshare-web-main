import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {FileUploadService} from "../../services/file-upload.service";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-business-appointment-settings',
  templateUrl: './business-appointment-settings.component.html',
  styleUrls: ['./business-appointment-settings.component.css']
})
export class BusinessAppointmentSettingsComponent implements OnInit {

  businessId: any;
  progress: any = false;
  business: any;
  formOpen: any = false ;
  addSlotForm = this.fb.group({
    delete_id: '',
    id: '' ,
    listing_id: '',
    listing_type: '' ,
    day: '' ,
    starts_at: '' ,
    ends_at: '' ,
    slot_name: '',
    duration: '30',
    service_id: '',
    business_user_id: ''
  });

  userAction: string = "all"
  constructor(
    private fb : UntypedFormBuilder ,
    private listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService,
    private sweet : SweetAlertService,
    private route: ActivatedRoute
  ) { }


  days: any = [

    { day : 'Monday' } ,
    { day : 'Tuesday'} ,
    { day : 'Wednesday' } ,
    { day : 'Thursday' } ,
    { day : 'Friday' } ,
    { day : 'Saturday' } ,
    { day : 'Sunday'} ,
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.businessId = paramMap.get('business_id') || '' ;
      this.getBusinessDetails(this.businessId);
    })

    this.route.queryParams.subscribe(params => {
      if (params['tab']){
        this.userAction = params['tab'];
      } else {
        this.userAction = 'all'
      }
    })
  }

  async getBusinessDetails(business_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessDetails(business_id).toPromise();
      console.log(resp);

      if (resp.business) {
        this.business = resp.business ;
      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }

  delete(setting: any){
    this.addSlotForm.controls.delete_id.setValue(setting.id);
    this.saveAppointmentSettings();
  }

  editAppointmentSetting(setting: any){
    this.formOpen = true;
    this.addSlotForm.controls.id.setValue(setting.id);
    this.addSlotForm.controls.day.setValue(setting.day);
    this.addSlotForm.controls.starts_at.setValue(setting.starts_at);
    this.addSlotForm.controls.ends_at.setValue(setting.ends_at);
    this.addSlotForm.controls.slot_name.setValue(setting.slot_name);
    this.addSlotForm.controls.day.setValue(setting.day);
    this.addSlotForm.controls.day.setValue(setting.day);
  }

  cancel(){
    this.formOpen = false;
    this.addSlotForm.reset();
  }

  async saveAppointmentSettings() {

    if(! this.addSlotForm.controls.delete_id.value) {
      if (!this.addSlotForm.controls.slot_name.value) {
        this.snackbarService.openSnackBar('Please enter slot name');
        return;
      }

      if (!this.addSlotForm.controls.starts_at.value) {
        this.snackbarService.openSnackBar('Please select start time');
        return;
      }
      if(! this.addSlotForm.controls.ends_at.value){
        this.snackbarService.openSnackBar('Please select end time');
        return;
      }
      if(! this.addSlotForm.controls.duration.value){
        this.snackbarService.openSnackBar('Please select duration');
        return;
      }

      if(this.addSlotForm.controls.ends_at.value <= this.addSlotForm.controls.starts_at.value ){
        this.snackbarService.openSnackBar('End time should be greater than starting time');
        return;
      }

      try {
        this.progress = true;
        this.addSlotForm.controls.listing_id.setValue(this.businessId);
        this.addSlotForm.controls.listing_type.setValue('business');

        await this.saveForDays();

        this.getBusinessDetails(this.businessId);


      } catch ($exception: any) {
        this.snackbarService.openSnackBar($exception.message);

      } finally {
        this.progress = false;

        this.addSlotForm.reset();
        this.cancel();
      }
    } else {
      try {
        this.progress = true;
        this.addSlotForm.controls.listing_id.setValue(this.businessId);
        this.addSlotForm.controls.listing_type.setValue('business');

        await this.save()

        this.getBusinessDetails(this.businessId);


      } catch ($exception: any) {
        this.snackbarService.openSnackBar($exception.message);

      } finally {
        this.progress = false;

        this.addSlotForm.reset();
        this.cancel();
      }
    }

  }

  async saveForDays() {
    for (const day of this.days) {
      if (day.checked) {
        this.addSlotForm.controls.day.setValue(day.day);
        await this.save();
      }
    }
  }

  async save() {
    const resp = await this.listingService.saveAppointmentTime(this.addSlotForm.value).toPromise();
    console.log(resp);
    if (resp.success) {
      this.snackbarService.openSnackBar(resp.success);

    }
    if (resp.error) {
      this.snackbarService.openSnackBar(resp.error);
    }
  }

  toggleDaySelection(day: any, $event: MatCheckboxChange) {
    if($event.checked){
      day.checked = true ;
    } else {
      day.checked = false ;
    }
  }


}
