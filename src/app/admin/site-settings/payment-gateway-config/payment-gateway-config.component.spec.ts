import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayConfigComponent } from './payment-gateway-config.component';

describe('PaymentGatewayConfigComponent', () => {
  let component: PaymentGatewayConfigComponent;
  let fixture: ComponentFixture<PaymentGatewayConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatewayConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewayConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
