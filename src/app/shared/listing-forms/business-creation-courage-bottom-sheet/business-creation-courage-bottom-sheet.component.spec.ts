import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreationCourageBottomSheetComponent } from './business-creation-courage-bottom-sheet.component';

describe('BusinessCreationCourageBottomSheetComponent', () => {
  let component: BusinessCreationCourageBottomSheetComponent;
  let fixture: ComponentFixture<BusinessCreationCourageBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCreationCourageBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessCreationCourageBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
