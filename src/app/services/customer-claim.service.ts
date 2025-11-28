import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerClaimService {
  private baseUrl = environment.api;

  constructor(private http : HttpClient , private authService : AuthService
    , private router: Router

  ) { }

  saveClaim(businessID: any, data: any ): Observable<any> {
    return this.http.put(this.baseUrl + 'customer-claims/'+businessID, data);
  }

  getClaims(userID: any): Observable<any> {
    return this.http.get(this.baseUrl + 'customer-claims/'+userID);
  }
}
