import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SiteSettingsService} from "../../../../services/site-settings.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar-editor',
  templateUrl: './sidebar-editor.component.html',
  styleUrls: ['./sidebar-editor.component.css']
})
export class SidebarEditorComponent implements OnInit {



  progress: boolean = false;

  //  'sidebar_bg', 'sidebar_text_color', 'sidebar_font_size', 'sidebar_padding', 'sidebar_margin', 'sidebar_btn_bg', 'sidebar_btn_text_color', 'sidebar_btn_font_size'
  form = this.fb.group({
    sidebar_bg : ['', [Validators.required]] ,
    sidebar_text_color : ['', [Validators.required]] ,
    sidebar_font_size : ['', [Validators.required]] ,
    sidebar_padding : ['', [Validators.required]] ,
    sidebar_margin : ['', [Validators.required]] ,
    sidebar_btn_bg : ['', [Validators.required]] ,
    sidebar_btn_text_color : ['', [Validators.required]] ,
    sidebar_btn_font_size : ['', [Validators.required]] ,
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
      if(resp.portal_name){
        this.form = this.fb.group({
          sidebar_bg : [ resp.sidebar_bg, [Validators.required]] ,
          sidebar_text_color : [ resp.sidebar_text_color, [Validators.required]] ,
          sidebar_font_size : [ resp.sidebar_font_size, [Validators.required]] ,
          sidebar_padding : [ resp.sidebar_padding, [Validators.required]] ,
          sidebar_btn_bg : [ resp.sidebar_btn_bg, [Validators.required]] ,
          sidebar_btn_text_color : [ resp.sidebar_btn_text_color, [Validators.required]] ,
          sidebar_btn_font_size : [ resp.sidebar_btn_font_size, [Validators.required]] ,
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
