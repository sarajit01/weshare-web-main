import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedBusinessComponent } from './recently-viewed-business.component';

describe('RecentlyViewedBusinessComponent', () => {
  let component: RecentlyViewedBusinessComponent;
  let fixture: ComponentFixture<RecentlyViewedBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyViewedBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyViewedBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
