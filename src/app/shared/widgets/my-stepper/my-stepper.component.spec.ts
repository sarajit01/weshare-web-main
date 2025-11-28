import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStepperComponent } from './my-stepper.component';

describe('MyStepperComponent', () => {
  let component: MyStepperComponent;
  let fixture: ComponentFixture<MyStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
