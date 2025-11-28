import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBusinessComponent } from './favorite-business.component';

describe('FavoriteBusinessComponent', () => {
  let component: FavoriteBusinessComponent;
  let fixture: ComponentFixture<FavoriteBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
