import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {FileUploadService} from "../../services/file-upload.service";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {UserStatisticsComponent} from "../../shared/common/user-statistics/user-statistics.component";
import {UserService} from "../../services/user.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent extends UserStatisticsComponent implements OnInit {

  routes = ROUTES;
  public Editor = ClassicEditor;
  businesses: any | undefined;
  AdSaveProgress = false ;
  images: [] | undefined ;
  files: File[] = [];
  public fileProgress: boolean | undefined;


  constructor(
    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public userService: UserService,
    public sweetAlertService : SweetAlertService ,
    private uploadService : FileUploadService
  ) {
    super(userService, authService);
  }

  formAdInfo = this.fb.group({
    user_id : this.authService.getUserID() ,
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
    this.getStatistics();
    this.images = [] ;
  }

  async getMyBusinessListings() {
    try {
      const resp = await this._listingService.getListing('business',this.authService.getUserID(),'').toPromise();
      console.log(resp);
      if(resp.data){
        this.businesses = resp.data ;
        console.log(this.businesses);
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

      if (!this.files[0]) {
        this.snackbarService.openSnackBar('Please upload at least one image for the ad ');

      } else {

        await this.onUpload();

        this.formAdInfo.controls.business_id.setValue(this.formAdInfo.controls.business_id.value.id);
        await this.formAdInfo.controls.images.setValue(this.images);
        console.log(this.formAdInfo.value);
        this.saveAd(this.formAdInfo.value);
      }
    }


  }


  async saveAd(data: any) {


    try {
      this.AdSaveProgress = true;
      const resp = await this._listingService.saveAd(data).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweetAlertService.successNotification('Ad created successfully !', resp.success);
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




}
