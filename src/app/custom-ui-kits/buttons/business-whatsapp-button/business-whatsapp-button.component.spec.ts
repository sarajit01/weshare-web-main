import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessWhatsappButtonComponent } from './business-whatsapp-button.component';

describe('BusinessWhatsappButtonComponent', () => {
  let component: BusinessWhatsappButtonComponent;
  let fixture: ComponentFixture<BusinessWhatsappButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessWhatsappButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessWhatsappButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
