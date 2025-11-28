import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SiteSettingsService} from "../../../../services/site-settings.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-footer-editor',
  templateUrl: './footer-editor.component.html',
  styleUrls: ['./footer-editor.component.css']
})
export class FooterEditorComponent implements OnInit {

  //'footer_bg', 'footer_text_color', 'footer_font_size', 'footer_padding', 'footer_margin', 'footer_text'


  progress: boolean = false;
  form = this.fb.group({
    footer_bg : ['', [Validators.required]] ,
    footer_text_color : ['', [Validators.required]] ,
    footer_font_size : ['', [Validators.required]] ,
    footer_padding : ['', [Validators.required]] ,
    footer_margin : ['', [Validators.required]] ,
    footer_text : ['', [Validators.required]]
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
          footer_bg : [ resp.footer_bg, [Validators.required]] ,
          footer_text_color : [ resp.footer_text_color, [Validators.required]] ,
          footer_font_size : [ resp.footer_font_size, [Validators.required]] ,
          footer_padding : [ resp.footer_padding, [Validators.required]] ,
          footer_margin : [ resp.footer_margin, [Validators.required]] ,
          footer_text : [ resp.footer_text, [Validators.required]]
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
