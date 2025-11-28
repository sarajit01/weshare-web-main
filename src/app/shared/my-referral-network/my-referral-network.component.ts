import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-my-referral-network',
  templateUrl: './my-referral-network.component.html',
  styleUrls: ['./my-referral-network.component.css']
})
export class MyReferralNetworkComponent implements OnInit {

  isLoading: boolean = false
  user: any = null;
  referredUsers: any = []
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.getMyReferredUsers();
  }

  backPrev(){
    this.router.navigate(['/']);
  }

  async getMyReferredUsers() {
    const userId = this.authService.getUserID() ;
    try {
      this.isLoading = true
      const resp = await this.listingService.getReferredUsers(userId, 1).toPromise();
      console.log("My referral network")
      console.log(resp);
      if(resp.user){
        this.user = resp.user
      }
      if(resp.referred_users){
        this.referredUsers = resp.referred_users
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false
    }
  }

}
