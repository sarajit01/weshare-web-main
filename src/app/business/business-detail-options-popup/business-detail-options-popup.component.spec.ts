import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailOptionsPopupComponent } from './business-detail-options-popup.component';

describe('BusinessDetailOptionsPopupComponent', () => {
  let component: BusinessDetailOptionsPopupComponent;
  let fixture: ComponentFixture<BusinessDetailOptionsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailOptionsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDetailOptionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
