import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {FileUploadService} from "../../services/file-upload.service";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";

@Component({
  selector: 'app-add-business-user',
  templateUrl: './add-business-user.component.html',
  styleUrls: ['./add-business-user.component.css']
})
export class AddBusinessUserComponent implements OnInit {

  progress = {
    businessLoading: false ,
    user: {
      add: false ,
      edit: false ,
      clone: false ,
      delete: false ,
      all: false
    }
  };

  registerMethod: string = "all"

  user: any ;
  respData: any;
  business_id: any  ;
  business : any ;
  constructor(
    private listingService : ListingService ,
    private route : ActivatedRoute,
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    public authService : AuthService,
    private sweet : SweetAlertService
  ) { }

  formAddUser = this.fb.group({
    business_role : ['', [ Validators.required]] ,
    service_id : ['', [ Validators.required]] ,
    username : ['', [ Validators.required]] ,
    first_name : ['', [ Validators.required]] ,
    last_name : ['', [ Validators.required]] ,
    email : ['', [ Validators.required]] ,
    role: ['', Validators.required],
    business_email: ['', Validators.required],
    business_phone: ['', Validators.required],
    password : ['', [ Validators.required]] ,
    password_confirm : ['', [ Validators.required]] ,

  });

  formInviteUser = this.fb.group({
    business_role : ['', [ Validators.required]] ,
    service_id : ['', [ Validators.required]] ,
    business_email: ['', Validators.required],
    business_phone: ['', Validators.required],
    email : ['', [ Validators.required]] ,
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.business_id = paramMap.get('business_id');
      this.getBusinessDetails(this.business_id);
    })

    this.route.queryParams.subscribe(params => {
      if (params['register']){
        this.registerMethod = params['register']
      }
    })
  }

  async getBusinessDetails(business_id: any) {
    this.progress.businessLoading = true ;
    try {
      const resp = await this.listingService.getBusinessDetails(this.business_id).toPromise();
      if (resp.business) {
        this.business = resp.business;
        console.log(this.business);
      }
    } catch (e){

    } finally {
      this.progress.businessLoading = false ;
    }

  }

  async addBusinessUser(){

    this.formAddUser.controls.role.setValue('business');
    if(! this.formAddUser.valid){
      this.formAddUser.markAllAsTouched();
      return;
    }

    try {
      const resp = await this.listingService.addBusinessUser(this.business_id, this.formAddUser.value).toPromise();
      console.log("Api response business user creation", resp);
      this.respData = resp ;
      if(resp.id){
        this.sweet.successNotification("Business user added", "The business user added successfully, please share the login details with the user and the user account is ready to manage the assigned services of your business");
        this.formAddUser.reset();
        Object.keys(this.formAddUser.controls).forEach(key => {
          // @ts-ignore
          this.formAddUser.get(key).setErrors(null) ;
        });
      }
    } catch (e: any){
      console.log(e);
      if(e.error && e.error.errors){
        Object.keys(this.formAddUser.controls).forEach(key => {
          if(e.error.errors[key] !== undefined){
            // @ts-ignore
            this.formAddUser.get(key).setErrors([e.error.errors[key].toString()]) ;
            console.log(e.error.errors[key].toString());
          }
        });
      }
    } finally {
    }
  }

  async sendInvitation(){
    if(! this.formInviteUser.valid){
      this.formInviteUser.markAllAsTouched();
      return;
    }

    try {
      const resp = await this.listingService.sendInvitation(this.business_id, this.formInviteUser.value).toPromise();
      console.log("Api response business user invitation", resp);
      if(resp.id){
        this.sweet.successNotification("Invitation sent", "Invitation sent to the user, the user will be added as soon as the user accepts the invitation");
        this.formInviteUser.reset();
        Object.keys(this.formInviteUser.controls).forEach(key => {
          // @ts-ignore
          this.formInviteUser.get(key).setErrors(null) ;
        });
      }

      if(resp.error){
        this.sweet.errorNotification("Failed to send invitation", resp.error);
      }

    } catch (e: any){
      console.log(e);
      if(e.error && e.error.errors){
        Object.keys(this.formInviteUser.controls).forEach(key => {
          if(e.error.errors[key] !== undefined){
            // @ts-ignore
            this.formInviteUser.get(key).setErrors([e.error.errors[key].toString()]) ;
            console.log(e.error.errors[key].toString());
          }
        });
      }
    } finally {
    }
  }


}
