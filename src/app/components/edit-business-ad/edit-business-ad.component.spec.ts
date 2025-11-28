import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessAdComponent } from './edit-business-ad.component';

describe('EditBusinessAdComponent', () => {
  let component: EditBusinessAdComponent;
  let fixture: ComponentFixture<EditBusinessAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBusinessAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
