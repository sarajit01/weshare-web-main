import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../../services/country.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  progress: boolean = false ;
  countries: any[] = [] ;

  form = this.fb.group({
    id: [''] ,
    country_name : ['', [Validators.required]] ,
    country_code: ['', [Validators.required]] ,
    currency: ['', [Validators.required]] ,
    lang: ['', [Validators.required]]
  });
  constructor(
    private fb : UntypedFormBuilder ,
    private _countryService: CountryService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    try {
      this.progress = true ;
      const resp = await this._countryService.getAll().toPromise();
      if(resp.countries){
        this.countries = resp.countries ;
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

      resp = await this._countryService.create(this.form.value).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          // @ts-ignore
          this.form.get(key).setErrors(null) ;
        });
        this.getAll();
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
      const resp = await this._countryService.delete(id).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.getAll();
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

  edit(country: any) {
    try {
      this.form.controls.id.setValue(country.id);
      this.form.controls.country_name.setValue(country.country_name);
      this.form.controls.country_code.setValue(country.country_code);
      this.form.controls.lang.setValue(country.lang);
      this.form.controls.currency.setValue(country.currency);

    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async update(id: any) {
    try {
      this.progress = true ;
      const resp = await this._countryService.edit(id, this.form.value).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          // @ts-ignore
          this.form.get(key).setErrors(null) ;
        });
        this.getAll();
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
