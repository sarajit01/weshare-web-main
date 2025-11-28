import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsPickerComponent } from './icons-picker.component';

describe('IconsPickerComponent', () => {
  let component: IconsPickerComponent;
  let fixture: ComponentFixture<IconsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
