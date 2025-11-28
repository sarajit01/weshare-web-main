import {Component, Input, OnInit} from '@angular/core';
import {ROUTES} from "../../../core/routes";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../../services/listing.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {AuthService} from "../../../services/auth.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {environment} from "../../../../environments/environment";
import {Step} from "../../../models/Step";

@Component({
  selector: 'app-business-ad-form',
  templateUrl: './business-ad-form.component.html',
  styleUrls: ['./business-ad-form.component.css']
})
export class BusinessAdFormComponent implements OnInit {

  routes = ROUTES;
  public Editor = ClassicEditor;
  businesses: any | undefined;
  AdSaveProgress = false ;
  images: string[] = [] ;
  files: File[] = [];
  public fileProgress: boolean | undefined;
  @Input() businessAd: any = null;
  @Input() userId: any = undefined;
  @Input() isAdmin: any = false;

  steps: Step[] = [{name: "General"},{name: "Description"},{name: "Gallery"}] ;
  activeStep: number = 0 ;
  private validated:boolean = true
  heading: string = "General";
  buttonDisabled: boolean = false





  constructor(
    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private uploadService : FileUploadService
  ) { }

  formAdInfo = this.fb.group({
    id: '' ,
    user_id : this.userId || this.authService.getUserID() ,
    business_id :  ['', [ Validators.required]] ,
    title :  ['', [ Validators.required]] ,
    description :  ['', [ Validators.required]] ,
    date :  ['', [ Validators.required]] ,
    status :  ['', [ Validators.required]] ,
    images : [ '' ] ,
    search_business : ['']
  });

  ngOnInit(): void {
    this.getMyBusinessListings();

    if(this.businessAd){
      this.activeStep = -1
      this.formAdInfo.controls.id.setValue(this.businessAd.id);
      this.formAdInfo.controls.business_id.setValue(this.businessAd.business_id);
      this.formAdInfo.controls.title.setValue(this.businessAd.title);
      this.formAdInfo.controls.description.setValue(this.businessAd.description);
      this.formAdInfo.controls.date.setValue(this.businessAd.date);
      this.formAdInfo.controls.status.setValue(this.businessAd.status);
      if(this.businessAd.gallery){
        this.businessAd.gallery.forEach((data: any) => {
          this.images.push(data.img);
        });
      }

    } else {
      this.activeStep = 0
    }
  }

  deleteImg(img: any){
    this.images.splice(this.images.indexOf(img) , 1);
  }

  async getMyBusinessListings() {
    try {
      const resp = await this._listingService.getListing('business',this.formAdInfo.controls.user_id.value,'').toPromise();
      console.log(resp);
      if(resp.data){
        this.businesses = resp.data ;
        console.log(this.businesses);
        if(this.businessAd){
          this.businesses.forEach((data: any) => {
            if (data.id === this.businessAd.business_id) {
              this.formAdInfo.controls.business_id.setValue(data);
            }
          });
        }
      }
    } catch ($ex) {
    }
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File ) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }

  async onUpload() {
    if (!this.files[0]) {
      if(this.images.length > 0){
        return;
      }
      alert('Please upload at least one image !');
      return ;
    }


    try {
      this.fileProgress = true ;
      for (let i= 0 ; i<this.files.length ; i++){
        let data = new FormData();
        data.append('file' , this.files[i]) ;
        data.append('upload_preset' , environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if(resp.secure_url){
          // @ts-ignore
          this.images.push(resp.secure_url);
        }

      }

      this.fileProgress = false ;


    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    }

    //   return false ;


  }

  async createAd() {

    if (!this.formAdInfo.valid) {
      this.formAdInfo.markAllAsTouched();
      // return false ;
    } else {
      //   this.snackbarService.openSnackBar('Please upload at least one image for the ad ');

      if (this.images.length< 1 && !this.files[0]) {
        this.snackbarService.openSnackBar('Please upload at least one image for the ad');

      } else {

        await this.onUpload();

        if (this.images.length< 1 ) {
          this.snackbarService.openSnackBar('Please upload at least one image for the ad');
          return;
        }
        this.formAdInfo.controls.business_id.setValue(this.formAdInfo.controls.business_id.value.id);
        await this.formAdInfo.controls.images.setValue(this.images);
        console.log(this.formAdInfo.value);
        this.saveAd(this.formAdInfo.value);
      }
    }


  }


  async saveAd(data: any) {


    data.user_id = this.authService.getUserID()
    data.images = this.images
    try {
      this.AdSaveProgress = true;
      const resp = await this._listingService.saveAd(data).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweetAlertService.successNotification('Ad saved successfully !', resp.success);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (resp.error) {
        this.sweetAlertService.errorNotification('Ad creation failed', resp.error);

      }

    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification('Ad creation failed', 'Something went wrong !');


    } finally {
      this.AdSaveProgress = false;
    }


  }

  goStep(number: number) {
    this.activeStep = number
    if(this.activeStep == 0){
      this.heading = "General Info"
    }
    if(this.activeStep == 1){
      this.heading = "Description"
    }
    if(this.activeStep == 2){
      this.heading = "Timeline & Coupon Code"
    }
    if(this.activeStep == 3){
      this.heading = "Gallery"
    }
  }

  validateGeneral(){
    this.validated = true
    if (!this.formAdInfo.controls.business_id.valid){
      this.formAdInfo.controls.business_id.markAsTouched();
      this.validated = false
    }
    if (!this.formAdInfo.controls.title.valid){
      this.formAdInfo.controls.title.markAsTouched();
      this.validated = false
    }
    if (!this.formAdInfo.controls.date.valid){
      this.formAdInfo.controls.date.markAsTouched();
      this.validated = false
    }
  }

  save() {
    if (this.activeStep < this.steps.length) {
      if (this.activeStep === 0) {
        this.validateGeneral()
      }

      if (this.activeStep === 1) {
        this.validateDetails();
      }

      if (this.activeStep === 2) {
        this.validateGallery()
      }

      if (this.validated) {
        this.saveAd(this.formAdInfo)
      }
    }
  }

  validateGallery(){
    this.validated = true
    if( this.images.length < 1){
      this.validated = false
      this.snackbarService.openSnackBar('Please upload at least one image')
    }
  }

  validateDetails(){
    this.validated = true
    if (!this.formAdInfo.controls.description.valid){
      this.formAdInfo.controls.description.markAsTouched();
      this.validated = false
    }
  }

  nextStep(){
    if (this.activeStep < this.steps.length){
      if(this.activeStep === 0){
        this.validateGeneral()
      }

      if (this.activeStep === 1) {
        this.validateDetails();
      }

      if (this.activeStep === 2) {
        this.validateGallery()
      }

      if(this.validated) {
        if(this.activeStep < 2) {
          this.activeStep = this.activeStep + 1
        } else {
          this.saveAd(this.formAdInfo.value);
        }
      }
    }
  }

  prevStep(){
    if (this.activeStep > 0){
      this.activeStep = this.activeStep - 1
    }
  }


}
