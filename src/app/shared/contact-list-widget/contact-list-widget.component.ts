import {Component, Input, OnInit} from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-contact-list-widget',
  templateUrl: './contact-list-widget.component.html',
  styleUrls: ['./contact-list-widget.component.css']
})
export class ContactListWidgetComponent implements OnInit {

  @Input() title: string = "Recently Contacted"
  @Input() avatarSize: number = 48
  businesses: any = []
  constructor(
      private listingService: ListingService,
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getBusinessListings()
  }

  async getBusinessListings() {
    try {
      const resp = await this.listingService.getListingWithLimit('business', '','','approved', 'alphabet', '', '', 5).toPromise();
      console.log(resp);
      if (resp.data) {
        this.businesses = resp.data;
        console.log(this.businesses);
      }
    } catch ($ex) {

    }
  }

}
