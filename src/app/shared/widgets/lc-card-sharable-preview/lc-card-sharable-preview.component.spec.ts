import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcCardSharablePreviewComponent } from './lc-card-sharable-preview.component';

describe('LcCardSharablePreviewComponent', () => {
  let component: LcCardSharablePreviewComponent;
  let fixture: ComponentFixture<LcCardSharablePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcCardSharablePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcCardSharablePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
