import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailSimulatePreviewComponent } from './business-detail-simulate-preview.component';

describe('BusinessDetailSimulatePreviewComponent', () => {
  let component: BusinessDetailSimulatePreviewComponent;
  let fixture: ComponentFixture<BusinessDetailSimulatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailSimulatePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDetailSimulatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
