import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterBottomSheetComponent } from './search-filter-bottom-sheet.component';

describe('SearchFilterBottomSheetComponent', () => {
  let component: SearchFilterBottomSheetComponent;
  let fixture: ComponentFixture<SearchFilterBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFilterBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilterBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
