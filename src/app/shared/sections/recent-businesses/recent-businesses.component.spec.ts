import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBusinessesComponent } from './recent-businesses.component';

describe('RecentBusinessesComponent', () => {
  let component: RecentBusinessesComponent;
  let fixture: ComponentFixture<RecentBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
