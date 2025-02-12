import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdornoModel } from 'src/app/models/adorno.model';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { ColorModel } from 'src/app/models/color.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-adornos',
  templateUrl: './adornos.component.html',
  styleUrls: ['./adornos.component.scss'],
})
export class AdornosComponent {
  rutas = variables;
  icons = freeSet;
  editAdorno: AdornoModel = new AdornoModel();
  adornoList: AdornoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  //====== Catalogo
  catalogoList: CatalogoModel[] = [];
  auxCatalogo: CatalogoModel = new CatalogoModel();
  //====== Colores
  auxColor: ColorModel = new ColorModel();
  colorList: ColorModel[] = [];
  selectedColors: ColorModel[] = [];

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
        this.editAdorno = new AdornoModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditDecoration(adorno: AdornoModel) {
    this.editAdorno = adorno;
  }

  setDeleteDecoration(adorno: AdornoModel) {
    adorno.estado = false;
    this.editAdorno = adorno;
  }

  deleteDecoration() {}

  updateDecoration() {}

  saveDecoration() {}

  selectTipoAdorno(catalogo: CatalogoModel) {}

  selectColorAdorno(color: ColorModel) {
    this.selectedColors.push(color)
  }
}
