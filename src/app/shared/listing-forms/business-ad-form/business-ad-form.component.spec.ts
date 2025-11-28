import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAdFormComponent } from './business-ad-form.component';

describe('BusinessAdFormComponent', () => {
  let component: BusinessAdFormComponent;
  let fixture: ComponentFixture<BusinessAdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAdFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
