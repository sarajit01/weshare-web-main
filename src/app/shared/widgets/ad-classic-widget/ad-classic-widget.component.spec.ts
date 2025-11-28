import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdClassicWidgetComponent } from './ad-classic-widget.component';

describe('AdClassicWidgetComponent', () => {
  let component: AdClassicWidgetComponent;
  let fixture: ComponentFixture<AdClassicWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdClassicWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdClassicWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
