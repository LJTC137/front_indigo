import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { EquipoServicioModel } from 'src/app/models/equipo-servicio.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-equipo-servicio',
  templateUrl: './equipo-servicio.component.html',
  styleUrls: ['./equipo-servicio.component.scss'],
})
export class EquipoServicioComponent {
  rutas = variables;
  icons = freeSet;
  editEquipo: EquipoServicioModel = new EquipoServicioModel();
  equipoList: EquipoServicioModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  //====== Catalogo
  auxCatalogo: CatalogoModel = new CatalogoModel();
  catalogoList: CatalogoModel[] = [];

  // ====== Switch visibilidad modal
  toggleModal(number: number) {
    switch (number) {
      case 2:
        this.updating = true;
        break;
      case 3:
        this.eliminating = true;
        break;
      case 4:
        this.updating = false;
        this.eliminating = false;
        break;
      default:
        this.editEquipo = new EquipoServicioModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  seteditEquipo(equipo: EquipoServicioModel) {
    this.editEquipo = equipo;
  }

  setDeleteEquipo(equipo: EquipoServicioModel) {
    equipo.estado = false;
    this.editEquipo = equipo;
  }

  deleteEquipo() {}

  updateEquipo() {}

  saveEquipo() {}

  selectTipoEquipo(catalogo: CatalogoModel) {}

  selectTipoContratacion(catalogo: CatalogoModel) {}
}
