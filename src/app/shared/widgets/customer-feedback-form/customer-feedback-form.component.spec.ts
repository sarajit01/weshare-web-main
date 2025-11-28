import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeedbackFormComponent } from './customer-feedback-form.component';

describe('CustomerFeedbackFormComponent', () => {
  let component: CustomerFeedbackFormComponent;
  let fixture: ComponentFixture<CustomerFeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFeedbackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
