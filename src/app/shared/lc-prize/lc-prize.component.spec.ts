import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcPrizeComponent } from './lc-prize.component';

describe('LcPrizeComponent', () => {
  let component: LcPrizeComponent;
  let fixture: ComponentFixture<LcPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcPrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
