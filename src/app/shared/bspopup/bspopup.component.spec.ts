import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BSPopupComponent } from './bspopup.component';

describe('BSPopupComponent', () => {
  let component: BSPopupComponent;
  let fixture: ComponentFixture<BSPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BSPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BSPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
