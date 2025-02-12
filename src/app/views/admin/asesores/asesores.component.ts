import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AsesorModel } from 'src/app/models/asesor.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.scss'],
})
export class AsesoresComponent {
  rutas = variables;
  icons = freeSet;
  updating: boolean = false;
  eliminating: boolean = false;
  editAsesor: AsesorModel = new AsesorModel();
  asesorList: AsesorModel[] = [];
  visibleUpdate: boolean = false;
  constructor() {}

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
        this.editAsesor = new AsesorModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditAsesor(asesor: AsesorModel) {
    this.editAsesor = asesor;
  }

  setDeleteAsesor(asesor: AsesorModel) {
    asesor.estado = false;
    this.editAsesor = asesor;
  }

  deleteAsesor() {}

  updateAsesor() {}

  saveAsesor() {}
}
