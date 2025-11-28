import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCallButtonComponent } from './business-call-button.component';

describe('BusinessCallButtonComponent', () => {
  let component: BusinessCallButtonComponent;
  let fixture: ComponentFixture<BusinessCallButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCallButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCallButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
