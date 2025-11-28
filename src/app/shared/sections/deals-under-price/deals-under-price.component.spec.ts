import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsUnderPriceComponent } from './deals-under-price.component';

describe('DealsUnderPriceComponent', () => {
  let component: DealsUnderPriceComponent;
  let fixture: ComponentFixture<DealsUnderPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsUnderPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsUnderPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
