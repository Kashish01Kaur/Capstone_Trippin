import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseregisterComponent } from './useregister.component';

describe('UseregisterComponent', () => {
  let component: UseregisterComponent;
  let fixture: ComponentFixture<UseregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseregisterComponent]
    });
    fixture = TestBed.createComponent(UseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
