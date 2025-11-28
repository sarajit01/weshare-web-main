import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionClassicWidgetComponent } from './promotion-classic-widget.component';

describe('PromotionClassicWidgetComponent', () => {
  let component: PromotionClassicWidgetComponent;
  let fixture: ComponentFixture<PromotionClassicWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionClassicWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionClassicWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
