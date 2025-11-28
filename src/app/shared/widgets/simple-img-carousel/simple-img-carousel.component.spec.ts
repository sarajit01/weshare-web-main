import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImgCarouselComponent } from './simple-img-carousel.component';

describe('SimpleImgCarouselComponent', () => {
  let component: SimpleImgCarouselComponent;
  let fixture: ComponentFixture<SimpleImgCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleImgCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleImgCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
