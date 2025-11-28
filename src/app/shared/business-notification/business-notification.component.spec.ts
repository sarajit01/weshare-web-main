import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessNotificationComponent } from './business-notification.component';

describe('BusinessNotificationComponent', () => {
  let component: BusinessNotificationComponent;
  let fixture: ComponentFixture<BusinessNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
