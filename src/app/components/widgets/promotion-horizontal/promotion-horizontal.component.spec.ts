import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionHorizontalComponent } from './promotion-horizontal.component';

describe('PromotionHorizontalComponent', () => {
  let component: PromotionHorizontalComponent;
  let fixture: ComponentFixture<PromotionHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
