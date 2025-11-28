import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {IconService} from "../../services/icon.service";
import {CategoryService} from "../../services/category.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
import {FileUploadService} from "../../services/file-upload.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {
  cat_id: any ;
  category:any  = undefined;
  isLoading = false
  fileProgress = false;
  saveProgress = false ;
  files: File[] = [];
  urls : any= [] ;
  banners: any = []

  constructor(
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    private iconService : IconService ,
    private catService : CategoryService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute,
    private uploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.cat_id = paramMap.get('cat_id');
      this.getCat();
      this.getBanners();
    });
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);


  }

  onRemove(event: File ) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }


  async getCat() {
    try {
      this.isLoading = true;
      const resp = await this.catService.getCategory(this.cat_id).toPromise();
      console.log(resp);
      if (resp.category) {
        this.category = resp.category ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }


  async onUpload() {

    try {
      this.fileProgress = true ;
      for (let i= 0 ; i<this.files.length ; i++){
        let data = new FormData();
        data.append('file' , this.files[i]) ;
        data.append('upload_preset' , environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if(resp.secure_url){
           this.urls.push(resp.secure_url);
        }

      }

    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    } finally {
      this.fileProgress = false ;

    }

  }

  async saveInGallery() {
    if (!this.files[0]) {
     this.snackbarService.openSnackBar('Please upload at least one image !');
      return ;
    }

    await this.onUpload();
    this.files = [];


    try {
      this.saveProgress = true ;
      let resp = await this.catService.saveBanners({
        cat_id: this.cat_id ,
        urls: this.urls
      }).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlert.successNotification('Saved successfully' , resp.success);
        this.getBanners();
      }

    } catch ($exception) {
      console.log($exception)
    } finally {
      this.saveProgress = false ;

    }
  }

  async getBanners() {
    try {
      this.isLoading = true;
      const resp = await this.catService.getBanners(this.cat_id).toPromise();
      console.log(resp);
      if (resp.gallery) {
        this.banners = resp.gallery ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }
  async deleteBanner(banner: any) {
    try {
      this.isLoading = true;
      const resp = await this.catService.deleteBanner(banner.id).toPromise();
      console.log(resp);
      if (resp.success) {
       this.snackbarService.openSnackBar(resp.success);
       this.getBanners();
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }


}
