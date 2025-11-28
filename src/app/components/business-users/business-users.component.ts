import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SweetAlertService} from "../../services/sweet-alert.service";

@Component({
  selector: 'app-business-users',
  templateUrl: './business-users.component.html',
  styleUrls: ['./business-users.component.css']
})
export class BusinessUsersComponent implements OnInit {

  progress = {
    businessLoading: false ,
    user: {
      add: false ,
      edit: false ,
      clone: false ,
      delete: false ,
      all: false
    }
  }
  business_id: any  ;
  business : any ;
  displayCreationPopup: boolean = false;

  constructor(
    private listingService : ListingService ,
    private route : ActivatedRoute,
    private sweet: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.business_id = paramMap.get('business_id');
      this.getBusinessDetails(this.business_id);
    })
  }

  async getBusinessDetails(business_id: any) {
    this.progress.businessLoading = true ;
    try {
      const resp = await this.listingService.getBusinessDetails(this.business_id).toPromise();
      if (resp.business) {
        this.business = resp.business;
        await this.getBusinessUsers();
      }
    } catch (e){

    } finally {
      this.progress.businessLoading = false ;
    }

  }

  async getBusinessUsers() {
    this.progress.businessLoading = true ;
    try {
      const resp = await this.listingService.getBusinessUsers(this.business_id, "").toPromise();
      if (resp.users) {
        this.business.users = resp.users;
      }
    } catch (e){

    } finally {
      this.progress.businessLoading = false ;
    }

  }

  async deleteBusinessUser(userId: any) {
    this.progress.businessLoading = true ;
    try {
      const resp = await this.listingService.deleteBusinessUser(this.business_id, userId).toPromise();
      if (resp.message) {
         this.sweet.successNotification("Business User deleted", resp.message);
         await this.getBusinessUsers();
      }
    } catch (e){

    } finally {
      this.progress.businessLoading = false ;
    }

  }


  toggleCreationPopup(){
    this.displayCreationPopup = !this.displayCreationPopup ;
  }
}
