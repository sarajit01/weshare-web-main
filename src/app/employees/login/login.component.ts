import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {ListingService} from "../../services/listing.service";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CustomerClaimService} from "../../services/customer-claim.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AddCustomerVisitComponent} from "../add-customer-visit/add-customer-visit.component";
import {AddCustomerRewardComponent} from "../add-customer-reward/add-customer-reward.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  routes = ROUTES;
  progress: boolean = false;
  business: any;
  business_id: any ;
  customers: any[] = [] ;
  total_points: any = null ;
  total_prizes: any = null ;
  total_visits: any = null ;
  customers_count: any = null ;
  respData: any;


  constructor(
    public listingService: ListingService,
    private fb : UntypedFormBuilder ,
    private authService: AuthService,
    private _customerClaimService: CustomerClaimService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router

  ) {



  }

  ngOnInit(): void {
    this.route.params.subscribe(paramMap => {
      this.business_id = paramMap['business_id']  ;

      if(this.authService.isEmployee(this.business_id)){
        this.router.navigate(['/employees/'+this.business_id]);
        return ;
      }

      //  alert(this.business_id);
      this.getBusinessDetails(this.business_id);
    })
  }

  async login(data:any) {
    try {

      data.business_id = this.business_id ;

      this.progress = true;
      const resp = await this.authService.login(data).toPromise();
      console.log(resp);
      this.respData = resp ;
      if(this.respData._token && this.respData.user_id && this.respData.role && this.respData.user){
        localStorage.setItem('_token' , this.respData._token);
        localStorage.setItem('user_id' , this.respData.user_id);
        localStorage.setItem('first_name' , this.respData.user.first_name);
        localStorage.setItem('last_name' , this.respData.user.last_name);
        localStorage.setItem('email' , this.respData.user.email);
        localStorage.setItem('role' , this.respData.role);
        localStorage.setItem('business_id' , this.business_id);


        setTimeout(() =>{
          this.router.navigate(['/employees/'+this.business_id]);
        } , 2000);


      }

    } catch (e) {
      console.log(e);
      this.respData = {
        error : "Something went wrong ! please try again later !"
      }
    } finally {
      this.progress = false;
    }
  }




  async getBusinessDetails(business_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessDetails(business_id).toPromise();
      console.log(resp);

      if (resp.business) {
        this.business = resp.business ;
      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false ;

    }
  }

}
