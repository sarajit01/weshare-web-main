import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyCardFormComponent } from './loyalty-card-form.component';

describe('LoyaltyCardFormComponent', () => {
  let component: LoyaltyCardFormComponent;
  let fixture: ComponentFixture<LoyaltyCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyCardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
