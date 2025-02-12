import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { MontajeModel } from 'src/app/models/montaje.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-montajes',
  templateUrl: './montajes.component.html',
  styleUrls: ['./montajes.component.scss'],
})
export class MontajesComponent {
  icons = freeSet;
  rutas = variables;
  editMontaje: MontajeModel = new MontajeModel();
  montajeList: MontajeModel[] = [];
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
        this.editMontaje = new MontajeModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditMontaje(montaje: MontajeModel) {
    this.editMontaje = montaje;
  }

  setDeleteMontaje(montaje: MontajeModel) {
    montaje.estado = false;
    this.editMontaje = montaje;
  }

  deleteMontaje() {}

  updateMontaje() {}

  saveMontaje() {}

  selectTipoMontaje(catalogo: CatalogoModel) {}

  selectTipoCobro(catalogo: CatalogoModel) {}
}
