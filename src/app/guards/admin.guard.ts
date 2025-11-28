import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ROUTES} from "../core/routes";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(private _authService : AuthService, private _router : Router) {}

  canActivate(): boolean {
    if (this._authService.isAdmin()) {
      return true;
    } else {
      this._router.navigate([ROUTES.admin_login]);
      return false;
    }
  }


}
