import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRentComponent } from './form-rent.component';

describe('FormRentComponent', () => {
  let component: FormRentComponent;
  let fixture: ComponentFixture<FormRentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRentComponent]
    });
    fixture = TestBed.createComponent(FormRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
