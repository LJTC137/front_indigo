import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { CateringModel } from 'src/app/models/catering.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.scss'],
})
export class CateringComponent {
  rutas = variables;
  icons = freeSet;
  editCatering: CateringModel = new CateringModel();
  cateringList: CateringModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
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
        this.editCatering = new CateringModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

     setEditCatering(catering: CateringModel) {
        this.editCatering = catering;
      }
    
      setDeleteCatering(catering: CateringModel) {
        catering.estado = false;
        this.editCatering = catering;
      }
  
        deleteCatering() {}
      
        updateCatering() {}
      
        saveCatering() {}
      
        selectTipoCatering(catalogo: CatalogoModel) {}
}
