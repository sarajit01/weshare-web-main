import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessClassicWidgetComponent } from './business-classic-widget.component';

describe('BusinessClassicWidgetComponent', () => {
  let component: BusinessClassicWidgetComponent;
  let fixture: ComponentFixture<BusinessClassicWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessClassicWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessClassicWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
