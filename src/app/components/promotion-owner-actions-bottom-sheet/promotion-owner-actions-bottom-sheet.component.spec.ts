import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionOwnerActionsBottomSheetComponent } from './promotion-owner-actions-bottom-sheet.component';

describe('PromotionOwnerActionsBottomSheetComponent', () => {
  let component: PromotionOwnerActionsBottomSheetComponent;
  let fixture: ComponentFixture<PromotionOwnerActionsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionOwnerActionsBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionOwnerActionsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
