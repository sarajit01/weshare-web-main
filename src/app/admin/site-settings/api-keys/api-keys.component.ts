import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SiteSettingsService} from "../../../services/site-settings.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.css']
})
export class ApiKeysComponent implements OnInit {

  progress: boolean = false;
  api_keys: any = {} ;
  constructor(
    private fb : UntypedFormBuilder ,
    private _siteSettingsService: SiteSettingsService,
    private _snackbarService: SnackbarService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.get();
  }

  /*
  `cloud_name`, `cloud_api`, `cloud_preset`, `pusher_api`, `pusher_secret`, `pusher_cluster`, `fb_app_id`, `fb_app_secret`, `g_client_id`, `g_client_secret`, `g_map_key`
   */

  async get() {
    try {
      this.progress = true ;
      const resp = await this._siteSettingsService.getApiKeys().toPromise();
      if(resp.api_keys){
        this.api_keys = resp.api_keys ;
        console.log(this.api_keys);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async save() {
    try {
      this.progress = true ;
      let resp ;

      resp = await this._siteSettingsService.saveApiKeys(this.api_keys).toPromise();
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
