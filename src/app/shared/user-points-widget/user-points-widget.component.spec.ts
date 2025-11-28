import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPointsWidgetComponent } from './user-points-widget.component';

describe('UserPointsWidgetComponent', () => {
  let component: UserPointsWidgetComponent;
  let fixture: ComponentFixture<UserPointsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPointsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPointsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
