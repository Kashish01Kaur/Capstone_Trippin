import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateRoutesComponent } from './calculate-routes.component';

describe('CalculateRoutesComponent', () => {
  let component: CalculateRoutesComponent;
  let fixture: ComponentFixture<CalculateRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateRoutesComponent]
    });
    fixture = TestBed.createComponent(CalculateRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
