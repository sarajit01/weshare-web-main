import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private baseUrl = environment.api;

  constructor(private http : HttpClient , private authService : AuthService) { }

  getPlans(): Observable<any> {
    return this.http.get(this.baseUrl + 'get-plans?user_id=' + this.authService.getUserID());
  }

  getPlanDetails(plan_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'get-plan-details?plan_id='+plan_id);
  }

  deletePlan(plan_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-plan?plan_id='+plan_id);
  }

  createPlan(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'add-plan' , data);
  }


  saveSettings(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-plan-settings' , data);
  }

  async getPlanDetailsById(id: any) {
    let data = {
      plan : null ,
      features : null ,
      error : undefined
    }
    try {
      const resp = await this.getPlanDetails(id).toPromise();
      console.log(resp);
      if (resp.plan) {
        data.plan = resp.plan ;
      }
      if (resp.features) {
        data.features = resp.features ;
      }
      if (resp.error) {
        data.error = resp.error ;
      }
    } catch ($ex: any) {
      data.error = $ex ;
    } finally {

    }
    return data ;
  }

  subscribe(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'subscribe/pixelpay' , data);
  }

  unsubscribe(): Observable<any> {
    return this.http.post(this.baseUrl + 'cancel-subscription' , {user_id: this.authService.getUserID()});
  }

  subscriptions(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'subscriptions?user_id='+userId);
  }

  updateSubscriptionStat(userId: any , status: string): Observable<any> {
    return this.http.get(this.baseUrl + 'update-subscription-stat?user_id='+userId+'&status='+status);
  }

  renewSubscription(Id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'renew-subscription?subscription_id='+Id);
  }

  featureEnabled( user: any, feature: string){
    if(user === null){
      return false;
    }
    if(! user.subscription){
      return false;
    }
    if( !user.subscription.plan ){
      return false;
    }
    if(!user.subscription.plan.features){
      return false;
    }
    let features = user.subscription.plan.features ;
    let featureIndex = features.findIndex((x: any) => x.feature && x.feature.name && x.feature.name === feature && x.status && x.status.toString() === '1');
    if(featureIndex === -1){
      return false ;
    }
    return features[featureIndex];
  }

  getFeatureLimit(user: any, feature: string){
    let checkFeatureEnabled  = this.featureEnabled(user, feature);
    if(! checkFeatureEnabled || !checkFeatureEnabled.maximum_limit){
      return 0 ;
    }
    return checkFeatureEnabled.maximum_limit ;
  }

}
