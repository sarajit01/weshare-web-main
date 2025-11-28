import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHorizontalComponent } from './business-horizontal.component';

describe('BusinessHorizontalComponent', () => {
  let component: BusinessHorizontalComponent;
  let fixture: ComponentFixture<BusinessHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
