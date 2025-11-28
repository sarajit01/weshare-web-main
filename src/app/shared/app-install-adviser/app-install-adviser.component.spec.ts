import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstallAdviserComponent } from './app-install-adviser.component';

describe('AppInstallAdviserComponent', () => {
  let component: AppInstallAdviserComponent;
  let fixture: ComponentFixture<AppInstallAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInstallAdviserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInstallAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
