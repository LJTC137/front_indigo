import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { ProductoTecnicoModel } from 'src/app/models/producto-tecnico.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-producto-tecnico',
  templateUrl: './producto-tecnico.component.html',
  styleUrls: ['./producto-tecnico.component.scss'],
})
export class ProductoTecnicoComponent {
  icons = freeSet;
  rutas = variables;
  editProducto: ProductoTecnicoModel = new ProductoTecnicoModel();
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  productoList: ProductoTecnicoModel[] = [];
  //====== Catalogo
  catalogoList: CatalogoModel[] = [];
  auxCatalogo: CatalogoModel = new CatalogoModel();

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
        this.editProducto = new ProductoTecnicoModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditProduct(producto: ProductoTecnicoModel) {
    this.editProducto = producto;
  }

  setDeleteProduct(producto: ProductoTecnicoModel) {
    producto.estado = false;
    this.editProducto = producto;
  }

  selectTipoProducto(catalogo: CatalogoModel) {}
  selectStateProduct(catalogo: CatalogoModel) {}

  deleteProduct(){}

  updateProduct(){}

  saveProduct(){}
}
