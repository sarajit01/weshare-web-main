import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {CountryService} from "../../../services/country.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {CityService} from "../../../services/city.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  progress: boolean = false ;
  country: any = null ;
  country_id: any = null ;

  form = this.fb.group({
    id: [''] ,
    country_id : ['', [Validators.required]] ,
    city: [ '', [Validators.required]] ,
    currency: ['', [Validators.required]] ,
    lang: [ '', [Validators.required]]
  });
  constructor(
    private fb : UntypedFormBuilder ,
    private _countryService: CountryService,
    private _cityService: CityService,
    private _snackbarService: SnackbarService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.country_id = paramMap.get('id') || '' ;
      this.get();
    })
  }

  async get() {
    try {
      this.progress = true ;
      const resp = await this._countryService.get(this.country_id).toPromise();
      if(resp.country){
        this.country = resp.country;
        this.form.controls.country_id.setValue(this.country.id);
        this.form.controls.currency.setValue(this.country.currency);
        this.form.controls.lang.setValue(this.country.lang);
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
      if(this.form.controls.id.value){
        return this.update(this.form.controls.id.value);
      }
      resp = await this._cityService.create(this.form.value).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          // @ts-ignore
          this.form.get(key).setErrors(null) ;
        });
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

  async delete(id: any) {
    try {
      this.progress = true ;
      const resp = await this._cityService.delete(id).toPromise();
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

  edit(city: any) {
    try {
      this.form.controls.id.setValue(city.id);
      this.form.controls.country_id.setValue(this.country.id);
      this.form.controls.city.setValue(city.city);
      this.form.controls.lang.setValue(city.lang);
      this.form.controls.currency.setValue(city.currency);

    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async update(id: any) {
    try {
      this.progress = true ;
      const resp = await this._cityService.edit(id, this.form.value).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          // @ts-ignore
          this.form.get(key).setErrors(null) ;
        });
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
