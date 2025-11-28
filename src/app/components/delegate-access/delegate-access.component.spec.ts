import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateAccessComponent } from './delegate-access.component';

describe('DelegateAccessComponent', () => {
  let component: DelegateAccessComponent;
  let fixture: ComponentFixture<DelegateAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
