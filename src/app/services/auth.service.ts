import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {SocialAuthService} from "angularx-social-login";
import {SnackbarService} from "./snackbar.service";
import {ROUTES} from "../core/routes";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.api;

  constructor(private http : HttpClient , private socialAuthUser: SocialAuthService , public snackbarService : SnackbarService,

              private router: Router
              ) {  }

  isLoggedIn(){
    if(localStorage.getItem('user_id') && localStorage.getItem('_token') && this.getRole() && this.getRole() !== 'admin'){
      return true ;
    }
    return false ;
  }

  isAdmin(){
    if(localStorage.getItem('user_id') && localStorage.getItem('_token') && this.getRole() && this.getRole() === 'admin'){
      return true ;
    } else {
      return false ;
    }
  }

  isEmployee(business_id: any){
    // @ts-ignore
    if(localStorage.getItem('user_id') && localStorage.getItem('_token') && this.getRole() && this.getRole() !== 'admin' && localStorage.getItem('business_id') !== null  && parseInt(localStorage.getItem('business_id')) === parseInt(business_id)){
      return true ;
    } else {
      return false ;
    }
  }


  login(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'login', data);
  }

  getAuthUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'auth/user');
  }

  socialLogin(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'social-login', data);
  }

  register(data: any , role:any ): Observable<any> {
    data.role = role ;
    return this.http.post(this.baseUrl + 'register', data);
  }

  getRole(){

    let role = localStorage.getItem('role');

    return role;
  }

  getAuthUserData(field: string){
    return  localStorage.getItem(field);
  }

  logout() :Observable<any>{
    this.removeAuthCredentials();
    const data = {
      logout : '1' ,
      _token : localStorage.getItem('_token')
    }

    this.socialAuthUser.signOut();

    return this.http.post(this.baseUrl + 'logout', data);

  }

  async logoutWithRedirect(){
    try {
      this.removeAuthCredentials();
      this.router.navigate([ROUTES.login]);
      const resp = await this.logout().toPromise();
    } catch (err) {

    }
  }

  getUserID(){
    return localStorage.getItem('user_id') ;
  }

  getAuthToken(){
    return localStorage.getItem('_token');
  }

  removeAuthCredentials(){
    localStorage.removeItem('user_id') ;
    localStorage.removeItem('_token') ;
    localStorage.removeItem('role') ;
    localStorage.removeItem('business_id') ;

  }


}
