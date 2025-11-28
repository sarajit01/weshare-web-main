import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCalendarBottomSheetComponent } from './appointment-calendar-bottom-sheet.component';

describe('AppointmentCalendarBottomSheetComponent', () => {
  let component: AppointmentCalendarBottomSheetComponent;
  let fixture: ComponentFixture<AppointmentCalendarBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCalendarBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCalendarBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
