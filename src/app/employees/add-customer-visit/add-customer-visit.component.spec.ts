import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerVisitComponent } from './add-customer-visit.component';

describe('AddCustomerVisitComponent', () => {
  let component: AddCustomerVisitComponent;
  let fixture: ComponentFixture<AddCustomerVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
