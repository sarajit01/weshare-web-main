import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBottomToolbarComponent } from './business-bottom-toolbar.component';

describe('BusinessBottomToolbarComponent', () => {
  let component: BusinessBottomToolbarComponent;
  let fixture: ComponentFixture<BusinessBottomToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessBottomToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessBottomToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
