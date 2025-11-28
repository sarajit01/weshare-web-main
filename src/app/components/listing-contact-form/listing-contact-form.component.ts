import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listing-contact-form',
  templateUrl: './listing-contact-form.component.html',
  styleUrls: ['./listing-contact-form.component.css']
})
export class ListingContactFormComponent implements OnInit {

  @Input() listingId: any = null;
  @Input() receiverId: any = null;
  @Input() listingType: any = null;
  @Input() repliedTo: any = null ;
  progress = false;


  contactForm = this.fb.group({
    listing_id: this.listingId,
    listing_type: this.listingType ,
    customer_id : this.authService.getUserID() ,
    name :  ['', [ Validators.required]] ,
    email :  ['', [ Validators.required]] ,
    phone :  ['', [ Validators.required]] ,
    message :  ['', [ Validators.required]] ,
  });


  constructor(
    private fb : UntypedFormBuilder ,
    private router: Router,
    private authService: AuthService,
    private listingService: ListingService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async sendMsg() {
    if (!this.contactForm.valid) {
      return;
    }
    this.contactForm.controls.listing_id.setValue(this.listingId);
    this.contactForm.controls.listing_type.setValue(this.listingType);
    if (!this.contactForm.controls.customer_id.value) {
      this.sweet.errorNotification('Require authentication', 'Please login as customer to send a message');

      setTimeout(() => {
        this.router.navigate(
          ['/sign-in'],
          { queryParams: { role: 'customer' } }
        );
      }, 2000);

      return;
    }
    try {
      this.progress = true;
      const resp = await this.listingService.sendContactMsg(this.contactForm.value).toPromise();
      console.log(resp);

      if (resp.success) {
        this.sweet.successNotification('Message sent successfully', resp.success);



      }
      if (resp.error) {
        this.sweet.errorNotification('Failed to send', resp.error);
      }

    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }


  }

}
