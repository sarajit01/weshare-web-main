import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPromotionsCarouselComponent } from './featured-promotions-carousel.component';

describe('FeaturedPromotionsCarouselComponent', () => {
  let component: FeaturedPromotionsCarouselComponent;
  let fixture: ComponentFixture<FeaturedPromotionsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedPromotionsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPromotionsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
