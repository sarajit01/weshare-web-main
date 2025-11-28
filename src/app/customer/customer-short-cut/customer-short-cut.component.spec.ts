import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShortCutComponent } from './customer-short-cut.component';

describe('CustomerShortCutComponent', () => {
  let component: CustomerShortCutComponent;
  let fixture: ComponentFixture<CustomerShortCutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerShortCutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerShortCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
