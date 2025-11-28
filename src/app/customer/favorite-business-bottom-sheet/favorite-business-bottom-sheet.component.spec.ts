import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBusinessBottomSheetComponent } from './favorite-business-bottom-sheet.component';

describe('FavoriteBusinessBottomSheetComponent', () => {
  let component: FavoriteBusinessBottomSheetComponent;
  let fixture: ComponentFixture<FavoriteBusinessBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteBusinessBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteBusinessBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
