import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionBottomToolbarComponent } from './promotion-bottom-toolbar.component';

describe('PromotionBottomToolbarComponent', () => {
  let component: PromotionBottomToolbarComponent;
  let fixture: ComponentFixture<PromotionBottomToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionBottomToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionBottomToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
