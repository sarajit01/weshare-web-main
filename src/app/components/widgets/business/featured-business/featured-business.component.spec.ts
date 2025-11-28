import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBusinessComponent } from './featured-business.component';

describe('FeaturedBusinessComponent', () => {
  let component: FeaturedBusinessComponent;
  let fixture: ComponentFixture<FeaturedBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
