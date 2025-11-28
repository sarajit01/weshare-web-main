import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsFilterBSComponent } from './payments-filter-bs.component';

describe('PaymentsFilterBSComponent', () => {
  let component: PaymentsFilterBSComponent;
  let fixture: ComponentFixture<PaymentsFilterBSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsFilterBSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsFilterBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
