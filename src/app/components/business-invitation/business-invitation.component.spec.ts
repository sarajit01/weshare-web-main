import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInvitationComponent } from './business-invitation.component';

describe('BusinessInvitationComponent', () => {
  let component: BusinessInvitationComponent;
  let fixture: ComponentFixture<BusinessInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
