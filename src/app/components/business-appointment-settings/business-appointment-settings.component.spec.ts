import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAppointmentSettingsComponent } from './business-appointment-settings.component';

describe('BusinessAppointmentSettingsComponent', () => {
  let component: BusinessAppointmentSettingsComponent;
  let fixture: ComponentFixture<BusinessAppointmentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAppointmentSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAppointmentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
