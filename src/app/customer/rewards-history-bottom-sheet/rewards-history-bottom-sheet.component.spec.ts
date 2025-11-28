import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsHistoryBottomSheetComponent } from './rewards-history-bottom-sheet.component';

describe('RewardsHistoryBottomSheetComponent', () => {
  let component: RewardsHistoryBottomSheetComponent;
  let fixture: ComponentFixture<RewardsHistoryBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsHistoryBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsHistoryBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
