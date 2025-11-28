import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRScanErrorPopupComponent } from './qrscan-error-popup.component';

describe('QRScanErrorPopupComponent', () => {
  let component: QRScanErrorPopupComponent;
  let fixture: ComponentFixture<QRScanErrorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRScanErrorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRScanErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
