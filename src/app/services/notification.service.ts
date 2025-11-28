import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "./snackbar.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = environment.api+"notifications";
  constructor(private http : HttpClient, private snackbarService: SnackbarService) { }
  getNotifications(user_id: any, page: number): Observable<any> {
    return this.http.get(this.baseUrl+`/all?user_id=${user_id}&page=${page}`);
  }
  countNewNotifications(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl+`/count-new?user_id=${user_id}`);
  }

}
