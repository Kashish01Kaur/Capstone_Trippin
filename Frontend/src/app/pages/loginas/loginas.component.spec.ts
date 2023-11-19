import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginasComponent } from './loginas.component';

describe('LoginasComponent', () => {
  let component: LoginasComponent;
  let fixture: ComponentFixture<LoginasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginasComponent]
    });
    fixture = TestBed.createComponent(LoginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
