import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoTecnicoComponent } from './producto-tecnico.component';

describe('ProductoTecnicoComponent', () => {
  let component: ProductoTecnicoComponent;
  let fixture: ComponentFixture<ProductoTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoTecnicoComponent]
    });
    fixture = TestBed.createComponent(ProductoTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
