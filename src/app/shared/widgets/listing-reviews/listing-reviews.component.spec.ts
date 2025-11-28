import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReviewsComponent } from './listing-reviews.component';

describe('ListingReviewsComponent', () => {
  let component: ListingReviewsComponent;
  let fixture: ComponentFixture<ListingReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
