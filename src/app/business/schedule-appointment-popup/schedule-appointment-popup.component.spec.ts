import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentPopupComponent } from './schedule-appointment-popup.component';

describe('ScheduleAppointmentPopupComponent', () => {
  let component: ScheduleAppointmentPopupComponent;
  let fixture: ComponentFixture<ScheduleAppointmentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAppointmentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAppointmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
