import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CMSService {
  private baseUrl = environment.api+"cms";
  constructor(private http : HttpClient) { }

  getPages(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get(this.baseUrl+'/'+id);
  }

  create(data: any): Observable<any> {
    return this.http.put(this.baseUrl , data);
  }

  edit(id: any , data: any): Observable<any> {
    return this.http.patch(this.baseUrl+'/' + id , data );
  }

  delete(id: any ): Observable<any> {
    return this.http.delete(this.baseUrl+'/' + id);
  }
}
