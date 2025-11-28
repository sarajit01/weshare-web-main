import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCustomerRewardComponent } from './debit-customer-reward.component';

describe('DebitCustomerRewardComponent', () => {
  let component: DebitCustomerRewardComponent;
  let fixture: ComponentFixture<DebitCustomerRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitCustomerRewardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitCustomerRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
