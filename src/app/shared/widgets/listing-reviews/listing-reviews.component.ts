import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listing-reviews',
  templateUrl: './listing-reviews.component.html',
  styleUrls: ['./listing-reviews.component.css']
})
export class ListingReviewsComponent implements OnInit {

  @Input() business: any ;
  starRating = 5;
  feedbackForm = false;

  constructor() { }

  ngOnInit(): void {
  }


}
