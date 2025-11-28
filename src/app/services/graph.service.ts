import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ListingService} from "./listing.service";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private baseUrl = environment.api;
  constructor(
    private http: HttpClient,
    private listingService : ListingService ,
    private authService : AuthService
  ) { }

  getGraphData(listingType: any,userID: any, fromDate: any, toDate: any): Observable<any> {
    return this.http.get(this.baseUrl + 'business/graph/'+listingType+'/'+userID+'?from_date='+fromDate+'&to_date='+toDate);
  }

}
