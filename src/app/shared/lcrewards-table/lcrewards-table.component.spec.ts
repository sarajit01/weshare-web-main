import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCRewardsTableComponent } from './lcrewards-table.component';

describe('LCRewardsTableComponent', () => {
  let component: LCRewardsTableComponent;
  let fixture: ComponentFixture<LCRewardsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCRewardsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCRewardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
