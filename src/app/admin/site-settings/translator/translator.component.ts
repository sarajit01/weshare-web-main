import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
import {SiteSettingsService} from "../../../services/site-settings.service";

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent implements OnInit {

  form = this.fb.group({
    key : ['', [Validators.required]] ,
    value: ['', [Validators.required]] ,
  });
  progress: boolean = false;
  translations: any = [];
  ln: string = 'en';
  addMode: boolean = false ;


  constructor(
    private fb : UntypedFormBuilder ,
    private userService: UserService ,
    private snackbarService : SnackbarService ,
    private sweetAlert : SweetAlertService,
    private route : ActivatedRoute,
    private siteSettingsService: SiteSettingsService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.ln = paramMap.get('ln') || 'en';
      this.getTranslations();
    });
  }

  resetPass(){

  }


  addSentence(){
    this.translations?.push({
      key: this.form.controls.key.value ,
      value: this.form.controls.value.value
    });

    this.form.reset();

  }

  async getTranslations() {

    try {
      this.progress = true ;
      const resp = await this.siteSettingsService.getTranslations(this.ln).toPromise();
      if(resp.translations){
        this.translations = [] ;
        for(let key in resp.translations){

          let obj = {
            key: key ,
            value: resp.translations[key]
          }
          this.translations.push(obj)

        }
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async saveTranslations() {
    try {
      this.progress = true ;
      const resp = await this.siteSettingsService.saveTranslations(this.ln, this.translations).toPromise();
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success);
        await this.getTranslations();
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }


  switchAdderMode(mode: boolean) {
    this.addMode = mode ;
  }
}
