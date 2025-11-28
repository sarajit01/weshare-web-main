import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private baseUrl = environment.api;


  constructor(private http : HttpClient , private authService : AuthService
    , private router: Router

  ) { }

  getIcons(search: string ): Observable<any> {
    return this.http.get(this.baseUrl + 'find-icons?keyword='+search);
  }

}
