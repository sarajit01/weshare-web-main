import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePromotionComponent } from './favorite-promotion.component';

describe('FavoritePromotionComponent', () => {
  let component: FavoritePromotionComponent;
  let fixture: ComponentFixture<FavoritePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
