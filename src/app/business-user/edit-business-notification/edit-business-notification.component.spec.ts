import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessNotificationComponent } from './edit-business-notification.component';

describe('EditBusinessNotificationComponent', () => {
  let component: EditBusinessNotificationComponent;
  let fixture: ComponentFixture<EditBusinessNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBusinessNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
