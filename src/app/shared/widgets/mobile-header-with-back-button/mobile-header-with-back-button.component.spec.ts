import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHeaderWithBackButtonComponent } from './mobile-header-with-back-button.component';

describe('MobileHeaderWithBackButtonComponent', () => {
  let component: MobileHeaderWithBackButtonComponent;
  let fixture: ComponentFixture<MobileHeaderWithBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileHeaderWithBackButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileHeaderWithBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
