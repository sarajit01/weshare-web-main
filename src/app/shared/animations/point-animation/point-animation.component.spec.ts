import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointAnimationComponent } from './point-animation.component';

describe('PointAnimationComponent', () => {
  let component: PointAnimationComponent;
  let fixture: ComponentFixture<PointAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
