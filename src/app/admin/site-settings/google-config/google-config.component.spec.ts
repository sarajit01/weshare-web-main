import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleConfigComponent } from './google-config.component';

describe('GoogleConfigComponent', () => {
  let component: GoogleConfigComponent;
  let fixture: ComponentFixture<GoogleConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
