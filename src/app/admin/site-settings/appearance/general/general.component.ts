import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {CountryService} from "../../../../services/country.service";
import {CityService} from "../../../../services/city.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";
import {SiteSettingsService} from "../../../../services/site-settings.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  progress: boolean = false;

  form = this.fb.group({
    portal_name : ['', [Validators.required]] ,
    portal_description: [ ''] ,
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
        this.form.controls.portal_name.setValue(resp.portal_name);
        this.form.controls.portal_description.setValue(resp.portal_description);
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
