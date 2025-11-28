import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenStarComponent } from './golden-star.component';

describe('GoldenStarComponent', () => {
  let component: GoldenStarComponent;
  let fixture: ComponentFixture<GoldenStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldenStarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldenStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
