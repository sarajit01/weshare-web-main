import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBusinessesCarouselComponent } from './featured-businesses-carousel.component';

describe('FeaturedBusinessesCarouselComponent', () => {
  let component: FeaturedBusinessesCarouselComponent;
  let fixture: ComponentFixture<FeaturedBusinessesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedBusinessesCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedBusinessesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
