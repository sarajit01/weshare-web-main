import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SiteSettingsService} from "../../../../services/site-settings.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.css']
})
export class SocialLinksComponent implements OnInit {

  progress: boolean = false;

  //   'fb_link', 'whatsapp_link', 'instagram_link', 'youtube_link', 'twitter_link'
  form = this.fb.group({
    fb_link : [''] ,
    whatsapp_link : [''] ,
    instagram_link : [''] ,
    youtube_link : [''] ,
    twitter_link : ['']
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
          fb_link : [ resp.fb_link] ,
          whatsapp_link : [ resp.whatsapp_link] ,
          instagram_link : [ resp.instagram_link] ,
          youtube_link : [ resp.youtube_link] ,
          twitter_link : [ resp.twitter_link]
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
