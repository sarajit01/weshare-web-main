import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingContactFormComponent } from './listing-contact-form.component';

describe('ListingContactFormComponent', () => {
  let component: ListingContactFormComponent;
  let fixture: ComponentFixture<ListingContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
