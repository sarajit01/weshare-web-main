import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReplyComponent } from './customer-reply.component';

describe('CustomerReplyComponent', () => {
  let component: CustomerReplyComponent;
  let fixture: ComponentFixture<CustomerReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
