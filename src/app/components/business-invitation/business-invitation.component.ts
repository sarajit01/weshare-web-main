import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-business-invitation',
  templateUrl: './business-invitation.component.html',
  styleUrls: ['./business-invitation.component.css']
})
export class BusinessInvitationComponent implements OnInit {

  progress = {
    invitationsLoading: false ,
  }

  invitations: any[] = [] ;

  constructor(
    private listingService : ListingService ,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route : ActivatedRoute,
    private sweet: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getInvitations();
  }



  async getInvitations() {
    this.progress.invitationsLoading = true ;
    try {
      const resp = await this.listingService.getInvitations(this.authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.invitations) {
        this.invitations = resp.invitations;
      }
    } catch (e){

    } finally {
      this.progress.invitationsLoading = false ;
    }

  }

  async acceptInvitation(invitationId: any) {
    this.progress.invitationsLoading = true ;
    try {
      const resp = await this.listingService.acceptInvitation(invitationId).toPromise();
      if (resp.id) {
        this.sweet.successNotification("Invitation accepted", "Invitation accepted successfully, you are now assistant of the business ("+resp.business_name+")");
        await this.getInvitations();
      }

      if(resp.error){
        this.sweet.errorNotification("Invitation failed to accept", resp.error);
      }

    } catch (e){

    } finally {
      this.progress.invitationsLoading = false ;
    }

  }

  async deleteInvitation(invitationId: any) {
    this.progress.invitationsLoading = true ;
    try {
      const resp = await this.listingService.deleteInvitation(invitationId).toPromise();
      if (resp.message) {
        this.snackbarService.openSnackBar(resp.message);
        await this.getInvitations();
      }
    } catch (e){

    } finally {
      this.progress.invitationsLoading = false ;
    }

  }


}
