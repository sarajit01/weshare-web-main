import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCPreviewBottomSheetComponent } from './lcpreview-bottom-sheet.component';

describe('LCPreviewBottomSheetComponent', () => {
  let component: LCPreviewBottomSheetComponent;
  let fixture: ComponentFixture<LCPreviewBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCPreviewBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCPreviewBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
