import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ROUTES} from "../../core/routes";

@Component({
  selector: 'app-business-notification',
  templateUrl: './business-notification.component.html',
  styleUrls: ['./business-notification.component.css']
})
export class BusinessNotificationComponent implements OnInit {
  routes = ROUTES;
  @Input() businessNotification: any ;
  @Input() isOwner: any;
  @Output() eventDeleted: EventEmitter<any> = new EventEmitter();
  @Input() displayMode: string = 'horizontal' ;

  constructor(
    private _listingService: ListingService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }


  async delete() {
    try {
      const resp = await this._listingService.deleteBusinessNotification(this.businessNotification.id).toPromise();
      console.log(resp);
      if (resp.success) {
        this._snackBarService.openSnackBar(resp.success);
        this.eventDeleted.emit();
      }

    } catch ($ex) {

    }

  }

  deleteConfirmation(){
    Swal.fire({
      title: 'Are you sure to delete this business notification?',
      text: 'The notification will be removed from your business page and cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then(async (result: { value: any; dismiss: any; }) => {
      if (result.value) {

        await this.delete();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }


}
