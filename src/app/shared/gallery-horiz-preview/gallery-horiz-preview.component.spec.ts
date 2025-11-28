import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryHorizPreviewComponent } from './gallery-horiz-preview.component';

describe('GalleryHorizPreviewComponent', () => {
  let component: GalleryHorizPreviewComponent;
  let fixture: ComponentFixture<GalleryHorizPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryHorizPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryHorizPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
