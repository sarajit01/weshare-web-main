import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ROUTES} from "../core/routes";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  private _authorized = false ;
  constructor(private _authService : AuthService, private _router : Router) {
  }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;

     /* try {

        const resp = await this._authService.getAuthUser().toPromise();
        console.log(resp);
        if (resp.id) {
          return true;
        }
        return false ;
      } catch ($ex) {
        return false;
      } */


    } else {
      this._router.navigate([ROUTES.login]);
      return false;
    }
  }



}
