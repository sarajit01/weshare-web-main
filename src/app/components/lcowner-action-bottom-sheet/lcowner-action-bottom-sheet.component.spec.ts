import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCOwnerActionBottomSheetComponent } from './lcowner-action-bottom-sheet.component';

describe('LCOwnerActionBottomSheetComponent', () => {
  let component: LCOwnerActionBottomSheetComponent;
  let fixture: ComponentFixture<LCOwnerActionBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCOwnerActionBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCOwnerActionBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
