import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralNetworkWidgetComponent } from './referral-network-widget.component';

describe('ReferralNetworkWidgetComponent', () => {
  let component: ReferralNetworkWidgetComponent;
  let fixture: ComponentFixture<ReferralNetworkWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralNetworkWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralNetworkWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
