import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPointsWidgetComponent } from './my-points-widget.component';

describe('MyPointsWidgetComponent', () => {
  let component: MyPointsWidgetComponent;
  let fixture: ComponentFixture<MyPointsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPointsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPointsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
