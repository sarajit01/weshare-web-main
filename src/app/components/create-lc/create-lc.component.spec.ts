import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLCComponent } from './create-lc.component';

describe('CreateLCComponent', () => {
  let component: CreateLCComponent;
  let fixture: ComponentFixture<CreateLCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
