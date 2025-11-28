import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReferralNetworkComponent } from './my-referral-network.component';

describe('MyReferralNetworkComponent', () => {
  let component: MyReferralNetworkComponent;
  let fixture: ComponentFixture<MyReferralNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReferralNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReferralNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
