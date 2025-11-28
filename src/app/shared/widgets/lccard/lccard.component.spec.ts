import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCCardComponent } from './lccard.component';

describe('LCCardComponent', () => {
  let component: LCCardComponent;
  let fixture: ComponentFixture<LCCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
