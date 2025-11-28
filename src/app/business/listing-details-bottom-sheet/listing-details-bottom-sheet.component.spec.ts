import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDetailsBottomSheetComponent } from './listing-details-bottom-sheet.component';

describe('ListingDetailsBottomSheetComponent', () => {
  let component: ListingDetailsBottomSheetComponent;
  let fixture: ComponentFixture<ListingDetailsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingDetailsBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingDetailsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
