import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ROUTES} from "../core/routes";

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard  {

  business_id: any ;
  private route: ActivatedRouteSnapshot;


  constructor(private _authService : AuthService, private _router : Router,activatedRoute: ActivatedRoute ){
    this.route = activatedRoute.snapshot;

    this.business_id = this.route.paramMap.get('business_id')
    alert(this.business_id);
  }
  canActivate(): boolean {
    return false;
  }

}
