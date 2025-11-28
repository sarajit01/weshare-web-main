import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReplyComponent } from './business-reply.component';

describe('BusinessReplyComponent', () => {
  let component: BusinessReplyComponent;
  let fixture: ComponentFixture<BusinessReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
