import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerActionsBottomSheetComponent } from './business-owner-actions-bottom-sheet.component';

describe('BusinessOwnerActionsBottomSheetComponent', () => {
  let component: BusinessOwnerActionsBottomSheetComponent;
  let fixture: ComponentFixture<BusinessOwnerActionsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessOwnerActionsBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOwnerActionsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
