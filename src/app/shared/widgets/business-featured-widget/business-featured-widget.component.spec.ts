import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFeaturedWidgetComponent } from './business-featured-widget.component';

describe('BusinessFeaturedWidgetComponent', () => {
  let component: BusinessFeaturedWidgetComponent;
  let fixture: ComponentFixture<BusinessFeaturedWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessFeaturedWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFeaturedWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
