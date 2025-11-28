import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-my-reward-history',
  templateUrl: './my-reward-history.component.html',
  styleUrls: ['./my-reward-history.component.css']
})
export class MyRewardHistoryComponent implements OnInit {
  progress: boolean = false;
  rewards_history: any[] = [] ;

  constructor(
    public dialogRef: MatDialogRef<MyRewardHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb : UntypedFormBuilder ,
    public authService: AuthService,
    public snackbarService: SnackbarService,
    public listingService: ListingService) {

  }

  ngOnInit() {
    this.getRewardHistory();
  }

  async getRewardHistory() {
    console.log(this.data.customer);
    try {
      this.progress = true ;
      const resp = await this.listingService.getRewardHistory( this.authService.getUserID(), this.data.business_id, null,  this.data.reward_type).toPromise();
      console.log(resp);

      if (resp.rewards_history) {
        this.rewards_history = resp.rewards_history ;
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
