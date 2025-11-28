import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl = environment.api;
  constructor(private http : HttpClient , private authService : AuthService) { }

  create(data: any): Observable<any> {
    return this.http.put(this.baseUrl+"countries/cities" , data);
  }

  edit(id: any , data: any): Observable<any> {
    return this.http.patch(this.baseUrl+'countries/cities/' + id , data );
  }

  delete(id: any ): Observable<any> {
    return this.http.delete(this.baseUrl+'countries/cities/' + id);
  }

  get(search: string| null): Observable<any> {
    return this.http.get(this.baseUrl+"cities?search="+search);
  }
}
