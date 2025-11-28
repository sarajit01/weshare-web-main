import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-customer-reply',
  templateUrl: './customer-reply.component.html',
  styleUrls: ['./customer-reply.component.css']
})
export class CustomerReplyComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CustomerReplyComponent>,
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



}
