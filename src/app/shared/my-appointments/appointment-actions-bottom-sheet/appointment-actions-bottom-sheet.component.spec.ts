import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentActionsBottomSheetComponent } from './appointment-actions-bottom-sheet.component';

describe('AppointmentActionsBottomSheetComponent', () => {
  let component: AppointmentActionsBottomSheetComponent;
  let fixture: ComponentFixture<AppointmentActionsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentActionsBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentActionsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
