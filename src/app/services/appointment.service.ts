import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AvailableCollaboratorsReq} from "../models/Appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = environment.api;

  constructor(private http : HttpClient , private authService : AuthService) { }

  getAvailableCollaborators(data: AvailableCollaboratorsReq): Observable<any> {
    return this.http.post(this.baseUrl + 'appointments/available-users', data);
  }

  bookAppointments(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'appointments/book-appointments', data);
  }

  // my-appointments
  myAppointments(date: string, status: string): Observable<any> {
    return this.http.get(this.baseUrl + `appointments/my-appointments?user_id=${this.authService.getUserID()}&date=${date}&status=${status}`);
  }

  confirmAppointment(appointment_id: number): Observable<any> {
    return this.http.get(this.baseUrl + `appointments/confirm-appointment/${appointment_id}`);
  }

  rejectAppointment(appointment_id: number): Observable<any> {
    return this.http.get(this.baseUrl + `appointments/reject-appointment/${appointment_id}`);
  }

}
