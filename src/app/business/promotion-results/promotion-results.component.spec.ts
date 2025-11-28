import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionResultsComponent } from './promotion-results.component';

describe('PromotionResultsComponent', () => {
  let component: PromotionResultsComponent;
  let fixture: ComponentFixture<PromotionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
