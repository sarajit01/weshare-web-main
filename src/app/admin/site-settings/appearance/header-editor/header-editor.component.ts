import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SiteSettingsService} from "../../../../services/site-settings.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header-editor',
  templateUrl: './header-editor.component.html',
  styleUrls: ['./header-editor.component.css']
})
export class HeaderEditorComponent implements OnInit {


  progress: boolean = false;

  //  'header_bg', 'header_text_color', 'header_font_size', 'header_padding', 'header_margin', 'header_icon_bg', 'header_icon_color', 'header_btn_bg', 'header_btn_text_color', 'header_btn_font_size'

  form = this.fb.group({
    header_bg : ['', [Validators.required]] ,
    header_text_color : ['', [Validators.required]] ,
    header_font_size : ['', [Validators.required]] ,
    header_padding : ['', [Validators.required]] ,
    header_margin : ['', [Validators.required]] ,
    header_icon_bg : ['', [Validators.required]] ,
    header_icon_color : ['', [Validators.required]] ,
    header_btn_bg : ['', [Validators.required]] ,
    header_btn_text_color : ['', [Validators.required]] ,
    header_btn_font_size : ['', [Validators.required]] ,
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

        this.form.controls.header_bg.setValue(resp.header_bg);
        this.form.controls.header_text_color.setValue(resp.header_text_color);
        this.form.controls.header_font_size.setValue(resp.header_font_size);
        this.form.controls.header_padding.setValue(resp.header_padding);
        this.form.controls.header_margin.setValue(resp.header_margin);
        this.form.controls.header_icon_bg.setValue(resp.header_icon_bg);
        this.form.controls.header_icon_color.setValue(resp.header_icon_color);
        this.form.controls.header_btn_bg.setValue(resp.header_btn_bg);
        this.form.controls.header_btn_text_color.setValue(resp.header_btn_text_color);
        this.form.controls.header_btn_font_size.setValue(resp.header_btn_font_size);
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
