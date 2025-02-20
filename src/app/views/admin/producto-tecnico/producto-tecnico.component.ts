import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { ProductoTecnicoModel } from 'src/app/models/producto-tecnico.model';
import { ProductoTecnicoService } from 'src/app/services/producto-tecnico.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-producto-tecnico',
  templateUrl: './producto-tecnico.component.html',
  styleUrls: ['./producto-tecnico.component.scss'],
})
export class ProductoTecnicoComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editProducto: ProductoTecnicoModel = new ProductoTecnicoModel();
  productoList: ProductoTecnicoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;

  // Para los catálogos: asumimos que "Tipo producto" y "Estado producto" son los nombres en el catálogo.
  catalogoList: CatalogoModel[] = []; // Para "Tipo de producto"
  estadoList: CatalogoModel[] = []; // Para "Estado del producto"
  // Variables auxiliares para la selección
  auxCatalogo: CatalogoModel = new CatalogoModel();
  auxEstado: CatalogoModel = new CatalogoModel();

  constructor(
    private productoService: ProductoTecnicoService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.getCatalogos();
  }

  // ====== Obtener productos técnicos
  private getProductos() {
    this.productoService.getList().subscribe({
      next: (data: ProductoTecnicoModel[]) => {
        this.productoList = data;
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // ====== Obtener catálogos
  private getCatalogos() {
    this.catalogoService.getList().subscribe({
      next: (data: CatalogoModel[]) => {
        // Filtrar para obtener el catálogo de "Tipo producto"
        this.catalogoList = data.filter(
          (c) => c.nombreCatalogo === 'Tipo producto'
        );
        // Filtrar para obtener el catálogo de "Estado producto"
        this.estadoList = data.filter(
          (c) => c.nombreCatalogo === 'Estado producto'
        );
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // ====== Guardar producto técnico
  saveProduct() {
    // Asignamos los catálogos seleccionados a los campos del modelo
    this.editProducto.tipoProducto = this.auxCatalogo;
    this.editProducto.estadoEquipo = this.auxEstado;
    this.productoService.create(this.editProducto).subscribe({
      next: (data: ProductoTecnicoModel) => {
        this.editProducto = data;
        this.visibleUpdate = false;
        this.toastrService.success('Producto guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getProductos();
      },
      error: (error) => {
        console.error('Error al guardar el producto:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar producto técnico
  updateProduct() {
    this.productoService
      .update(this.editProducto.idProducto, this.editProducto)
      .subscribe({
        next: (data: ProductoTecnicoModel) => {
          this.editProducto = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Producto actualizado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getProductos();
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  // ====== Eliminar producto técnico
  deleteProduct() {
    this.editProducto.estado = false;
    this.productoService
      .update(this.editProducto.idProducto, this.editProducto)
      .subscribe({
        next: (data: ProductoTecnicoModel) => {
          this.editProducto = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Producto eliminado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getProductos();
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  // ====== Alternar visibilidad del modal
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
        this.auxCatalogo = new CatalogoModel();
        this.auxEstado = new CatalogoModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  // ====== Asignar producto para edición
  setEditProduct(producto: ProductoTecnicoModel) {
    this.editProducto = { ...producto };
    this.auxCatalogo = producto.tipoProducto;
    this.auxEstado = producto.estadoEquipo;
  }

  // ====== Asignar producto para eliminación
  setDeleteProduct(producto: ProductoTecnicoModel) {
    producto.estado = false;
    this.editProducto = producto;
  }

  // ====== Seleccionar Tipo de producto
  selectTipoProducto(catalogo: CatalogoModel) {
    this.auxCatalogo = catalogo;
    this.editProducto.tipoProducto = catalogo;
  }

  // ====== Seleccionar Estado del producto
  selectStateProduct(catalogo: CatalogoModel) {
    this.auxEstado = catalogo;
    this.editProducto.estadoEquipo = catalogo;
  }
}
