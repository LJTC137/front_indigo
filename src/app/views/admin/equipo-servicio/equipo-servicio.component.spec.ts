import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoServicioComponent } from './equipo-servicio.component';

describe('EquipoServicioComponent', () => {
  let component: EquipoServicioComponent;
  let fixture: ComponentFixture<EquipoServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipoServicioComponent]
    });
    fixture = TestBed.createComponent(EquipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
