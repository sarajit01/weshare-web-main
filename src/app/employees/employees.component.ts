import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../core/routes";
import {ListingService} from "../services/listing.service";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {CustomerClaimService} from "../services/customer-claim.service";
import {SweetAlertService} from "../services/sweet-alert.service";
import {SnackbarService} from "../services/snackbar.service";
import {CreateClaimComponent} from "../customer/create-claim/create-claim.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AddCustomerVisitComponent} from "./add-customer-visit/add-customer-visit.component";
import {AddCustomerRewardComponent} from "./add-customer-reward/add-customer-reward.component";
import {CustomerRewardHistoryComponent} from "./customer-reward-history/customer-reward-history.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  routes = ROUTES;
  progress: boolean = false;
  business: any;
  business_id: any ;
  customers: any[] = [] ;
  total_points: any = null ;
  total_prizes: any = null ;
  total_visits: any = null ;
  customers_count: any = null ;
  activeRewardType: string = 'points'


  constructor(
    public listingService: ListingService,
    private fb : UntypedFormBuilder ,
    public authService: AuthService,
    private _customerClaimService: CustomerClaimService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router

  ) {



  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/employees/'+this.business_id+'/login']);

  }

  ngOnInit(): void {
    this.route.params.subscribe(paramMap => {
      this.business_id = paramMap['business_id']  ;

      if(! this.authService.isEmployee(this.business_id)){
        this.router.navigate(['/employees/'+this.business_id+'/login']);
        return ;
      }

    //  alert(this.business_id);
      this.getBusinessDetails(this.business_id);
    })
  }

  addVisit(customer_id: any) {
    this.dialog.open( AddCustomerVisitComponent, {
      width: '600px',
      data: {
        business: this.business,
        customer_id: customer_id
      }
    }).afterClosed().subscribe(result => {
      if(result){
        this.getRewardedCustomers(this.business_id, 'points');
      }
    });
  }

  addReward(customer_id: any, debit: any) {
    this.dialog.open( AddCustomerRewardComponent, {
      width: '600px',
      data: {
        business: this.business,
        customer_id: customer_id,
        debit: debit
      }
    }).afterClosed().subscribe(result => {
      if(result){
        this.getRewardedCustomers(this.business_id, 'points');
      }
    });
  }


  async getBusinessDetails(business_id: any) {
    try {
      this.progress = true ;
      const resp = await this.listingService.getBusinessDetails(business_id).toPromise();
      console.log(resp);

      if (resp.business) {
        this.business = resp.business ;
        await this.getRewardedCustomers(business_id, 'points');
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

  async getRewardedCustomers(business_id: any, reward_type: string) {
    this.activeRewardType = reward_type ;
    try {
      this.progress = true ;
      const resp = await this.listingService.getRewardedCustomers(business_id, reward_type).toPromise();
      console.log(resp);

      if (resp.customers) {
        this.customers = resp.customers ;
      }
      if (resp.total_prizes) {
        this.total_prizes = resp.total_prizes ;
      }
      if (resp.total_points) {
        this.total_points = resp.total_points ;
      }
      if (resp.total_visits) {
        this.total_visits = resp.total_visits ;
      }
      if (resp.customers_count) {
        this.customers_count = resp.customers_count ;
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


  viewHistory(customer: any, rewardType: string) {
    this.dialog.open( CustomerRewardHistoryComponent, {
      width: '800px',
      data: {
        business: this.business,
        business_id: this.business_id,
        customer: customer,
        reward_type: rewardType
      }
    }).afterClosed().subscribe(result => {

    });
  }
}
