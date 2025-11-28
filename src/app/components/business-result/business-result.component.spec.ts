import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessResultComponent } from './business-result.component';

describe('BusinessResultComponent', () => {
  let component: BusinessResultComponent;
  let fixture: ComponentFixture<BusinessResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
