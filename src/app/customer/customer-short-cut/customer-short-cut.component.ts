import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-customer-short-cut',
  templateUrl: './customer-short-cut.component.html',
  styleUrls: ['./customer-short-cut.component.css']
})
export class CustomerShortCutComponent implements OnInit {

  @Input() listingViewed: any
  constructor() { }

  ngOnInit(): void {
  }

}
