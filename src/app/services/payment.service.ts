import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = environment.api;

  constructor(
    private http : HttpClient ,
    private authService : AuthService,
    private router: Router,
  ) { }

  saveOfflineMethod(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-payment-method', data);
  }

  getOfflineMethod(): Observable<any> {
    return this.http.get(this.baseUrl + 'offline-payment-method');
  }
  getBankPayments(): Observable<any> {
    return this.http.get(this.baseUrl + 'bank-payments');
  }
  approveBankPayment(paymentId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'confirm-offline-payment?payment_id=' + paymentId);
  }
  denyBankPayment(paymentId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'deny-offline-payment?payment_id=' + paymentId);
  }

  saveBankPayment(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-bank-payment', data);
  }

  tokenizeCard(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'payment-methods/card', data);
  }
  getPaymentMethods(): Observable<any> {
    return this.http.get(this.baseUrl + `payment-methods?user_id=` + this.authService.getUserID());
  }
  deleteTokenizeCard(pm_id: any ): Observable<any> {
    return this.http.delete(this.baseUrl + `payment-methods/card?pm_id=${pm_id}&user_id=` + this.authService.getUserID());
  }
  getTransactionHistory(data: any): Observable<any> {
    return this.http.post(this.baseUrl + `transactions`, data);
  }

  getAllTransactionHistory(filter: any): Observable<any> {
    return this.http.post(this.baseUrl + `pixelpay/transactions/all` , filter);
  }

  getPaymentGateways(): Observable<any> {
    return this.http.get(this.baseUrl + `payment-gateways`);
  }

  savePaymentGateway(data: any): Observable<any> {
    return this.http.patch(this.baseUrl + `payment-gateways`, data);
  }

}
