import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyCardDetailsComponent } from './loyalty-card-details.component';

describe('LoyaltyCardDetailsComponent', () => {
  let component: LoyaltyCardDetailsComponent;
  let fixture: ComponentFixture<LoyaltyCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
