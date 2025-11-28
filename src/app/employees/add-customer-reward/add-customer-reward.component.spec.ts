import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerRewardComponent } from './add-customer-reward.component';

describe('AddCustomerRewardComponent', () => {
  let component: AddCustomerRewardComponent;
  let fixture: ComponentFixture<AddCustomerRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerRewardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
