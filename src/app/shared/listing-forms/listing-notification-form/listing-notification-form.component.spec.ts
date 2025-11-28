import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingNotificationFormComponent } from './listing-notification-form.component';

describe('ListingNotificationFormComponent', () => {
  let component: ListingNotificationFormComponent;
  let fixture: ComponentFixture<ListingNotificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingNotificationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingNotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
