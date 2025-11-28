import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMTPSettingsComponent } from './smtpsettings.component';

describe('SMTPSettingsComponent', () => {
  let component: SMTPSettingsComponent;
  let fixture: ComponentFixture<SMTPSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SMTPSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SMTPSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
