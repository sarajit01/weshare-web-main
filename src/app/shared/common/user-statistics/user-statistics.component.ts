import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-statistics',
  template: `
    <p>
    </p>
  `,
  styles: [
  ]
})
export class UserStatisticsComponent {

  progress: boolean = false;

  statistics: any = {
    businesses: 0,
    promotions: 0,
    discounts: 0,
    ads: 0,
    business_limit: 0,
    promotion_limit: 0 ,
    ad_limit: 0
  };

  constructor(
    public _userService: UserService,
    public _authService: AuthService
  ) { }


  async getStatistics() {
    try {
      this.progress = true ;
      const resp = await this._userService.getStatistics(this._authService.getUserID()).toPromise();
      console.log(resp);

      if (resp.businesses) {
        this.statistics = resp ;
      }

    } catch ($exception) {


    } finally {
      this.progress = false ;

    }
  }


}
