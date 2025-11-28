import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SiteSettingsService} from "../../../../services/site-settings.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {

  progress: boolean = false;

  //  'content_bg', 'content_heading_text_color', 'content_heading_font_size', 'content_padding', 'content_margin', 'content_btn_bg', 'content_btn_text_color', 'content_btn_font_size'
  form = this.fb.group({
    content_bg : ['', [Validators.required]] ,
    content_heading_text_color : ['', [Validators.required]] ,
    content_heading_font_size : ['', [Validators.required]] ,
    content_padding : ['', [Validators.required]] ,
    content_margin : ['', [Validators.required]] ,
    content_btn_bg : ['', [Validators.required]] ,
    content_btn_text_color : ['', [Validators.required]] ,
    content_btn_font_size : ['', [Validators.required]]
  });

  constructor(
    private fb : UntypedFormBuilder ,
    private _siteSettingsService: SiteSettingsService,
    private _snackbarService: SnackbarService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.get();
  }

  async get() {
    try {
      this.progress = true ;
      const resp = await this._siteSettingsService.get().toPromise();
      if(resp.id){

        this.form = this.fb.group({
          content_bg : [ resp.content_bg, [Validators.required]] ,
          content_heading_text_color : [ resp.content_heading_text_color, [Validators.required]] ,
          content_heading_font_size : [ resp.content_heading_font_size, [Validators.required]] ,
          content_padding : [ resp.content_padding, [Validators.required]] ,
          content_margin : [ resp.content_margin, [Validators.required]] ,
          content_btn_bg : [ resp.content_btn_bg, [Validators.required]] ,
          content_btn_text_color : [ resp.content_btn_text_color, [Validators.required]] ,
          content_btn_font_size : [ resp.content_btn_font_size, [Validators.required]]
        });
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async save() {
    if(! this.form.valid){
      this._snackbarService.openSnackBar("Please correct all the fields");
      return;
    }
    try {
      this.progress = true ;
      let resp ;

      resp = await this._siteSettingsService.save(this.form.value).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.get();
      }
      if(resp.error){
        this._snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }


}
