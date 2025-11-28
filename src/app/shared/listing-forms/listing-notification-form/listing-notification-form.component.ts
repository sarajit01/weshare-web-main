import {Component, Input, OnInit} from '@angular/core';
import {ROUTES} from "../../../core/routes";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../../services/listing.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {AuthService} from "../../../services/auth.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {FileUploadService} from "../../../services/file-upload.service";
//@ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-listing-notification-form',
  templateUrl: './listing-notification-form.component.html',
  styleUrls: ['./listing-notification-form.component.css']
})
export class ListingNotificationFormComponent implements OnInit {

  @Input() businessNotification: any ;
  routes = ROUTES;
  public Editor = ClassicEditor;
  businesses: any | undefined;
  notificationSaveProgress = false ;
  images: any = [] ;
  files: File[] = [];
  businessLoading = false ;
  public fileProgress: boolean | undefined;


  constructor(
    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private uploadService : FileUploadService
  ) { }

  formNotificationInfo = this.fb.group({
    user_id : this.authService.getUserID() ,
    listing_id :  ['', [ Validators.required]] ,
    listing_type : ['business'] ,
    name :  ['', [ Validators.required]] ,
    description :  ['', [ Validators.required]] ,
    images : [ this.images ] ,
    search_business : ['']
  });

  async ngOnInit(): Promise<void> {
    await this.getMyBusinessListings();
    if (this.businessNotification) {
      this.formNotificationInfo.controls.name.setValue(this.businessNotification.name);
      this.formNotificationInfo.controls.description.setValue(this.businessNotification.description);

      if(this.businesses){
        let index = this.businesses.findIndex((business: any ) => business.id.toString() === this.businessNotification.listing_id.toString())
        if(index !== -1){
          this.formNotificationInfo.controls.listing_id.setValue(this.businesses[index]);
        }
      }

      if(this.businessNotification.gallery && this.businessNotification.gallery.length){
        this.businessNotification.gallery.forEach((media: any) => {
          this.images.push(media.img);
        })
      }
    }
  }



  async getMyBusinessListings() {
    try {
      this.businessLoading = true ;
      const resp = await this._listingService.getListing('business',this.authService.getUserID(),'').toPromise();
      console.log(resp);
      if(resp.data){
        this.businesses = resp.data ;
        console.log(this.businesses);

      }
    } catch ($ex) {
    } finally {
      this.businessLoading = false ;
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

  async createNotification() {

    if (!this.formNotificationInfo.valid) {
      this.formNotificationInfo.markAllAsTouched();
      // return false ;
    } else {
      //   this.snackbarService.openSnackBar('Please upload at least one image for the ad ');

      if (!this.files[0] && ! this.images.length) {
        this.snackbarService.openSnackBar('Please upload at least one image for the notification ');

      } else {

        if(this.files[0]){
          await this.onUpload();
        }

        console.log(this.formNotificationInfo.value);
        this.formNotificationInfo.controls.listing_id.setValue(this.formNotificationInfo.controls.listing_id.value.id);
        await this.formNotificationInfo.controls.images.setValue(this.images);
        console.log(this.formNotificationInfo.value);
        this.saveNotification(this.formNotificationInfo.value);
      }
    }


  }


  async saveNotification(data: any) {
    try {
      this.notificationSaveProgress = true;
      let resp ;
      if(this.businessNotification){
        resp = await this._listingService.updateBusinessNotification(this.businessNotification.id , data).toPromise();
      } else {
        resp = await this._listingService.saveNotification(data).toPromise();
      }
      console.log(resp);
      if (resp.success) {
        this.sweetAlertService.successNotification('Notification saved successfully !', resp.success);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (resp.error) {
        this.sweetAlertService.errorNotification('Notification failed to save', resp.error);
      }
    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification('Notification failed to save', 'Something went wrong !');
    } finally {
      this.notificationSaveProgress = false;
    }
  }



  deleteImage(img: string){
    this.images.splice(this.images.indexOf(img), 1);
  }

}
