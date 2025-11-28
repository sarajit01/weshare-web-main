import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoButtonComponent } from './business-info-button.component';

describe('BusinessInfoButtonComponent', () => {
  let component: BusinessInfoButtonComponent;
  let fixture: ComponentFixture<BusinessInfoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInfoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
