import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../../../services/snackbar.service";
import {UntypedFormBuilder} from "@angular/forms";
import {SiteSettingsService} from "../../../../services/site-settings.service";
import {ActivatedRoute} from "@angular/router";
import {FileUploadService} from "../../../../services/file-upload.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-logo-editor',
  templateUrl: './logo-editor.component.html',
  styleUrls: ['./logo-editor.component.css']
})
export class LogoEditorComponent implements OnInit {

  progress: boolean = false;
  logo: string | undefined ;

  //  'sidebar_bg', 'sidebar_text_color', 'sidebar_font_size', 'sidebar_padding', 'sidebar_margin', 'sidebar_btn_bg', 'sidebar_btn_text_color', 'sidebar_btn_font_size'
  files: File[] = [];
  fileProgress: boolean = false;
  constructor(
    private fb : UntypedFormBuilder ,
    private _siteSettingsService: SiteSettingsService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private uploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.get().then(r => {

    });
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

  async get() {
    try {
      this.progress = true ;
      const resp = await this._siteSettingsService.get().toPromise();
      if(resp.logo){
        this.logo = resp.logo ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
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
          this.logo = resp.secure_url ;
        }

      }

    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    }

    //   return false ;


  }


  async save() {

    if(this.files[0]){
      await this.onUpload();
    }

    if(!this.logo){
      this.snackbarService.openSnackBar("Please select a logo to save");
      return
    }

    try {
      this.progress = true ;
      let resp ;

      resp = await this._siteSettingsService.save({
        logo: this.logo
      }).toPromise();
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success);
        await this.get();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

}
