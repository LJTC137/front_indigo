import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent {
  rutas = variables;
  icons = freeSet;
  catalogoList: CatalogoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  editCategory: CatalogoModel = new CatalogoModel();
  visibleUpdate: boolean = false;

  constructor(){}

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
        this.editCategory = new CatalogoModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditCategory(category: CatalogoModel) {
    this.editCategory = category;
  }

  setDeleteCategory(category: CatalogoModel){
    category.estado = false;
    this.editCategory = category
  }

  deleteCategory(){

  }

  updateCategory(){

  }

  saveCategory(){

  }
}
