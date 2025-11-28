import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.api;

  constructor(private http : HttpClient , private authService : AuthService) { }

  getDetails(userID: any): Observable<any> {
    return this.http.get(this.baseUrl + 'user/'+userID);
  }

  updateProfile(userID: any, data: any): Observable<any> {
    return this.http.patch(this.baseUrl + 'user/'+userID, data);
  }

  sendPasswordResetLink(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'forgot-password', data);
  }

  resetForgotPass(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'reset-forgot-password', data);
  }

  changePass(userID: any, data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'reset-password?user_id='+userID, data);
  }

  getStatistics(userID: any): Observable<any> {
    return this.http.get(this.baseUrl + 'business/statistics/'+userID);
  }

  getUsers(role: string, search: string): Observable<any> {
    return this.http.get(this.baseUrl + 'users?role='+role+'&search='+search);
  }

  deleteUser(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-user?user_id='+ user_id);
  }

  closeAccount(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'close-account?user_id='+ user_id);
  }


}
