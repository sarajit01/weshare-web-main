import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingFullScreenPreviewComponent } from './listing-full-screen-preview.component';

describe('ListingFullScreenPreviewComponent', () => {
  let component: ListingFullScreenPreviewComponent;
  let fixture: ComponentFixture<ListingFullScreenPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingFullScreenPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingFullScreenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
