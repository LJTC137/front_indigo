import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { LocalModel } from 'src/app/models/local.model';
import { variables } from 'src/app/variables';
import { CatalogoModel } from 'src/app/models/catalogo.model';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss'],
})
export class LocalesComponent {
  rutas = variables;
  icons = freeSet;
  editLocal: LocalModel = new LocalModel();
  localList: LocalModel[] = [];
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
        this.editLocal = new LocalModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditLocal(local: LocalModel) {
    this.editLocal = local;
  }

  setDeleteLocal(local: LocalModel) {
    local.estado = false;
    this.editLocal = local;
  }

  deleteLocal() {}

  updateLocal() {}

  saveLocal() {}

  selectTipoLocal(catalogo: CatalogoModel) {}

  selectStateLocal(catalogo: CatalogoModel) {}
}
