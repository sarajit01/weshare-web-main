import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRewardHistoryComponent } from './my-reward-history.component';

describe('MyRewardHistoryComponent', () => {
  let component: MyRewardHistoryComponent;
  let fixture: ComponentFixture<MyRewardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRewardHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRewardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
