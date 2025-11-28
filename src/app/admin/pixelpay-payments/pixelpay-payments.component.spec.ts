import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelpayPaymentsComponent } from './pixelpay-payments.component';

describe('PixelpayPaymentsComponent', () => {
  let component: PixelpayPaymentsComponent;
  let fixture: ComponentFixture<PixelpayPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelpayPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelpayPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
