import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryItemsComponent } from './gallery-items.component';

describe('GalleryItemsComponent', () => {
  let component: GalleryItemsComponent;
  let fixture: ComponentFixture<GalleryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
