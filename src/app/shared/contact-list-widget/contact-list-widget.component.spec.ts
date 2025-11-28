import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListWidgetComponent } from './contact-list-widget.component';

describe('ContactListWidgetComponent', () => {
  let component: ContactListWidgetComponent;
  let fixture: ComponentFixture<ContactListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
