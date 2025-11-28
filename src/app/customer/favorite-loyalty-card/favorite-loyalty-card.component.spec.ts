import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteLoyaltyCardComponent } from './favorite-loyalty-card.component';

describe('FavoriteLoyaltyCardComponent', () => {
  let component: FavoriteLoyaltyCardComponent;
  let fixture: ComponentFixture<FavoriteLoyaltyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteLoyaltyCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteLoyaltyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
