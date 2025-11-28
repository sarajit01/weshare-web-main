import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCLCComponent } from './featured-clc.component';

describe('FeaturedCLCComponent', () => {
  let component: FeaturedCLCComponent;
  let fixture: ComponentFixture<FeaturedCLCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedCLCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedCLCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
