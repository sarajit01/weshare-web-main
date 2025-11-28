import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessClaimsComponent } from './business-claims.component';

describe('BusinessClaimsComponent', () => {
  let component: BusinessClaimsComponent;
  let fixture: ComponentFixture<BusinessClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
