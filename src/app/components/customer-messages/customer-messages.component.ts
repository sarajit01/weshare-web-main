import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {BusinessReplyComponent} from "../business-reply/business-reply.component";

@Component({
  selector: 'app-customer-messages',
  templateUrl: './customer-messages.component.html',
  styleUrls: ['./customer-messages.component.css']
})
export class CustomerMessagesComponent implements OnInit {

  progress = false;
  messages: any = [] ;
  constructor(
    private fb : UntypedFormBuilder ,
    private authService: AuthService,
    private listingService: ListingService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMessages();
  }

  viewMessage(message: any){
    this.sweet.successNotification('Message', message);

  }

  async getMessages() {

    try {
      this.progress = true;
      const resp = await this.listingService.getCustomerMessages(this.authService.getUserID()).toPromise();
      console.log(resp);

      if (resp.messages) {
        this.messages = resp.messages;

      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to load messages', resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }


  }


  replyToMessage(message: any) {
    this.dialog.open(BusinessReplyComponent, {
      width: '600px',
      data: {
        id: message.id ,
        listing_id: message.listing_id ,
        listing_type: message.listing_type ,
        replied_to: message.id ,
        customer_id: message.customer_id ,
        message: message.message
      }
    });
  }


}
