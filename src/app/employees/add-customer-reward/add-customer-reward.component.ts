import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ListingService} from "../../services/listing.service";
import {EmployeeActivitiesComponent} from "../employee-activities/employee-activities.component";
import {ScannerQRCodeResult} from "ngx-scanner-qrcode";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-customer-reward',
  templateUrl: './add-customer-reward.component.html',
  styleUrls: ['./add-customer-reward.component.css']
})
export class AddCustomerRewardComponent extends EmployeeActivitiesComponent{


  scanOutput: any = null ;


  mediaConstrains: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: {
        exact: 'environment'
      }
    }
  }

  config = {
    medias: this.mediaConstrains
  }

  constructor(
    public dialogRef: MatDialogRef<AddCustomerRewardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb : UntypedFormBuilder ,
    public authService: AuthService,
    public snackbarService: SnackbarService,
    public listingService: ListingService) {
    super(data, fb, authService, snackbarService, listingService);
  }

  ngOnInit() {
    super.ngOnInit();
    if(this.data.debit){
      this.form.controls['reward_type'].setValue('points');
    }
  }

  loadScanOutput(data: BehaviorSubject<ScannerQRCodeResult[]>) {

    this.scanOutput = data ;

    if(this.scanOutput && this.scanOutput.value[0] && this.scanOutput.value[0].value){
      alert(this.scanOutput.value[0].value);
    }

  }



  onSuccessScan($event: string) {
    this.scanOutput = $event ;
    alert('Scanning complete! Result:\n'+this.scanOutput);
    if(this.scanOutput){
      let scanResults = this.scanOutput.split("\n");
      let listingType,listingId, customerId, referrerID, cardType ;
      if(scanResults[0]){
        let listingTypeArr = scanResults[0];
        listingType = listingTypeArr.split(":")[1];
      }
      if(scanResults[1]){
        let listingIdArr = scanResults[1];
        listingId = listingIdArr.split(":")[1];
      }
      if(scanResults[2]){
        let cusArr = scanResults[2];
        customerId = cusArr.split(":")[1];
      }
      if(scanResults[3]){
        let refArr = scanResults[3];
        referrerID = refArr.split(":")[1];
      }
      if(scanResults[4]){
        let cardArr = scanResults[4];
        cardType = cardArr.split(":")[1];
      }

      this.form.controls['listing_type'].setValue(listingType);
      this.form.controls['listing_id'].setValue(listingId);
      this.form.controls['customer_id'].setValue(customerId);
      this.form.controls['referrer_id'].setValue(referrerID);


    }
  }

  onScanError($event: Error) {
    alert($event);
  }

}
