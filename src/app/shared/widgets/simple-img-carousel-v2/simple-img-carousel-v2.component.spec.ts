import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImgCarouselV2Component } from './simple-img-carousel-v2.component';

describe('SimpleImgCarouselV2Component', () => {
  let component: SimpleImgCarouselV2Component;
  let fixture: ComponentFixture<SimpleImgCarouselV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleImgCarouselV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleImgCarouselV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
