import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRepliesComponent } from './business-replies.component';

describe('BusinessRepliesComponent', () => {
  let component: BusinessRepliesComponent;
  let fixture: ComponentFixture<BusinessRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRepliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
