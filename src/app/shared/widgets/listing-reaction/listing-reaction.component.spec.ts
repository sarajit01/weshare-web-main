import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReactionComponent } from './listing-reaction.component';

describe('ListingReactionComponent', () => {
  let component: ListingReactionComponent;
  let fixture: ComponentFixture<ListingReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingReactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
