import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeActivitiesComponent} from "../employee-activities/employee-activities.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-add-customer-visit',
  templateUrl: './add-customer-visit.component.html',
  styleUrls: ['./add-customer-visit.component.css']
})
export class AddCustomerVisitComponent extends EmployeeActivitiesComponent{

  constructor(
                public dialogRef: MatDialogRef<AddCustomerVisitComponent>,

                @Inject(MAT_DIALOG_DATA) public data: any,
                public fb : UntypedFormBuilder ,
                public authService: AuthService,
                public snackbarService: SnackbarService,
                public listingService: ListingService) {
    super(data, fb, authService, snackbarService, listingService);
  }


}
