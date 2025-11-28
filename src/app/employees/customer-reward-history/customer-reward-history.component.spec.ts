import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRewardHistoryComponent } from './customer-reward-history.component';

describe('CustomerRewardHistoryComponent', () => {
  let component: CustomerRewardHistoryComponent;
  let fixture: ComponentFixture<CustomerRewardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRewardHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerRewardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
