import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLCComponent } from './manage-lc.component';

describe('ManageLCComponent', () => {
  let component: ManageLCComponent;
  let fixture: ComponentFixture<ManageLCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
