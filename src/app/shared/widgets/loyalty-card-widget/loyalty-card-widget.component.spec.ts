import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyCardWidgetComponent } from './loyalty-card-widget.component';

describe('LoyaltyCardWidgetComponent', () => {
  let component: LoyaltyCardWidgetComponent;
  let fixture: ComponentFixture<LoyaltyCardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyCardWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyCardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
