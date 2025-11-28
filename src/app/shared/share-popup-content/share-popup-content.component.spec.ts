import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePopupContentComponent } from './share-popup-content.component';

describe('SharePopupContentComponent', () => {
  let component: SharePopupContentComponent;
  let fixture: ComponentFixture<SharePopupContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePopupContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePopupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
