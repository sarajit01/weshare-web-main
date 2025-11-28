import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAdsComponent } from './random-ads.component';

describe('RandomAdsComponent', () => {
  let component: RandomAdsComponent;
  let fixture: ComponentFixture<RandomAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
