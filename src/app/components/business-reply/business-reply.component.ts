import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-business-reply',
  templateUrl: './business-reply.component.html',
  styleUrls: ['./business-reply.component.css']
})
export class BusinessReplyComponent implements OnInit {
  progress = false;

  replyForm = this.fb.group({
    listing_id: this.data.listing_id,
    listing_type: this.data.listing_type ,
    customer_id : this.data.customer_id ,
    message :  ['', [ Validators.required]] ,
    replied_to :  [ this.data.id] ,
  });

  constructor(
    private dialogRef: MatDialogRef<BusinessReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb : UntypedFormBuilder ,
    private listingService: ListingService,
    private sweet: SweetAlertService,
    private snackbarService: SnackbarService

  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  async submitReply() {
    if (!this.replyForm.valid) {
      this.replyForm.markAllAsTouched();
      return;
    }

    console.log(this.replyForm.value);

    try {
      this.progress = true;
      const resp = await this.listingService.replyContact(this.replyForm.value).toPromise();
      console.log(resp);

      if (resp.success) {
        this.sweet.successNotification('Reply sent successfully', resp.success);
        this.closeModal();

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
