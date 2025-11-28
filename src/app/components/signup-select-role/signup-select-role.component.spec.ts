import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSelectRoleComponent } from './signup-select-role.component';

describe('SignupSelectRoleComponent', () => {
  let component: SignupSelectRoleComponent;
  let fixture: ComponentFixture<SignupSelectRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSelectRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSelectRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
