import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  private baseUrl = environment.api+"site-settings";
  constructor(private http : HttpClient, private snackbarService: SnackbarService) { }

  get(): Observable<any> {
    return this.http.get(this.baseUrl+"/appearance");
  }

  save(data: any): Observable<any> {
    return this.http.patch(this.baseUrl+'/appearance' , data );
  }

  getApiKeys(): Observable<any> {
    return this.http.get(this.baseUrl+"/api-keys");
  }

  getTranslations(ln: string): Observable<any> {
    return this.http.get(this.baseUrl+"/translation/"+ln);
  }

  saveTranslations(ln: string, translations: any): Observable<any> {
    return this.http.put(this.baseUrl+"/translation/"+ln, {ln : ln , translations: translations});
  }


  saveApiKeys(data: any): Observable<any> {
    return this.http.post(this.baseUrl+"/api-keys", data);
  }

  async initConfig() {
    try {
      let resp = await this.getApiKeys().toPromise();
      if (resp.api_keys) {
        resp = Object.entries(resp.api_keys);
        console.log(resp);
        resp.forEach((entry: any) => {
          localStorage.setItem( entry[0], entry[1]);
          console.log('data ' + entry[0], localStorage.getItem(entry[0]));
        });

      }
    } catch ($ex: any) {
      console.log($ex);
      this.snackbarService.openSnackBar('Please reload, something went wrong to load configuration settings');
    } finally {
    }
  }

}
