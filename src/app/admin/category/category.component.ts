import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {FileUploadService} from "../../services/file-upload.service";
import {IconService} from "../../services/icon.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  fileProgress = false;
  saveProgress = false ;
  files: File[] = [];
  icons = [] ;
  icon = undefined ;
  categories : any | undefined ;
  cat_id : any = undefined ;
  category :any = null;

  formCat = this.fb.group({
    icon : ['' , Validators.required ] ,
    iconSearch : [''] ,
    name :  ['', [ Validators.required]] ,
    parent_cat_id :  [''] ,
    banner : [''] ,
  });

  constructor(
    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService ,
    private uploadService : FileUploadService ,
    private iconService : IconService ,
    private catService : CategoryService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getIcons();
    this.getCats();
    this.cat_id =  this.route.snapshot.queryParamMap.get('cat_id');
  //  alert(this.cat_id);
    this.formCat.controls.parent_cat_id.setValue(this.cat_id);
    this.getCat(this.cat_id);


  }


  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    if(this.files[0]){
      this.snackbarService.openSnackBar('Only one image is allowed')
    } else {
      this.files.push(...event.addedFiles);
    }

  }

  onRemove(event: File ) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }

  async getIcons() {
    try {
      console.log(this.formCat.controls.iconSearch.value);
      const resp = await this.iconService.getIcons(this.formCat.controls.iconSearch.value).toPromise();
      console.log(resp);
      if (resp) {
        this.icons = resp ;
      }

    } catch ($ex) {
      console.log($ex);
    }

  }

  setIconVal(val:string){
    this.formCat.controls.icon.setValue(val);
  }

  async getCats() {

    try {
      console.log(this.formCat.controls.iconSearch);
      const resp = await this.catService.getAllCategories().toPromise();
      console.log(resp);
      if (resp) {
        this.categories = resp ;
        console.log(this.categories);
      }

    } catch ($ex) {
      console.log($ex);
    }

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
          this.formCat.controls.banner.setValue(resp.secure_url) ;
        }

      }

    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    } finally {
      this.fileProgress = false ;

    }

    //   return false ;


  }

  async createCat() {
    if (!this.formCat.valid) {
      this.snackbarService.openSnackBar('All the fields are required !')
    } else {

      if (!this.files[0]) {
        this.snackbarService.openSnackBar('Please upload an image for banner !')
      } else {

        await this.onUpload();
         this.saveCat();

      }

    }

  }


  async saveCat() {
    this.saveProgress = true ;
    try {

      console.log(this.formCat.value);
      const resp = await this.catService.save(this.formCat.value).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweetAlertService.successNotification('Category added', resp.success);

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      }

      if (resp.error) {
        this.sweetAlertService.errorNotification('Failed', resp.error);
      }


    } catch ($ex) {

      console.log($ex);
      this.sweetAlertService.errorNotification(
        'Failed',
        'Something went wrong !',
      );

    } finally {
      this.saveProgress = false ;
    }

  }


  async getCat(id: any) {

    try {

      const resp = await this.catService.getCategory(id).toPromise();
      console.log(resp);
      if (resp.category) {

        this.category = resp.category ;
      }

    } catch ($ex) {
      console.log($ex);
    }

  }



}
