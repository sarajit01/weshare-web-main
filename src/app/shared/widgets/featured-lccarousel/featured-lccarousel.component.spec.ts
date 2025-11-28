import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedLCCarouselComponent } from './featured-lccarousel.component';

describe('FeaturedLCCarouselComponent', () => {
  let component: FeaturedLCCarouselComponent;
  let fixture: ComponentFixture<FeaturedLCCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedLCCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedLCCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
