import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImgHorizCarouselComponent } from './simple-img-horiz-carousel.component';

describe('SimpleImgHorizCarouselComponent', () => {
  let component: SimpleImgHorizCarouselComponent;
  let fixture: ComponentFixture<SimpleImgHorizCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleImgHorizCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleImgHorizCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
