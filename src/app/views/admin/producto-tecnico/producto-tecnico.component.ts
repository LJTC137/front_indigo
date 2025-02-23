import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { ProductoTecnicoModel } from 'src/app/models/producto-tecnico.model';
import { ProductoTecnicoService } from 'src/app/services/producto-tecnico.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/images.service';

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
  isShowingGallery: boolean = false;
  imageList: ImageModel[] = [];

  // Para los catálogos: asumimos que "Tipo producto" y "Estado producto" son los nombres en el catálogo.
  catalogoList: CatalogoModel[] = []; // Para "Tipo de producto"
  estadoList: CatalogoModel[] = []; // Para "Estado del producto"
  // Variables auxiliares para la selección
  auxCatalogo: CatalogoModel = new CatalogoModel();
  auxEstado: CatalogoModel = new CatalogoModel();

  constructor(
    private productoService: ProductoTecnicoService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.getCatalogos();
  }

  cleanData() {
    this.auxCatalogo = new CatalogoModel();
    this.auxEstado = new CatalogoModel();
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
        this.catalogoList = data.filter(
          (c) => c.nombreCatalogo === 'Tipo producto'
        );
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

  selectedFiles: FileList | null = null;

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles = target.files;
    }
  }

  cleanSelectedFiles() {
    this.selectedFiles = null;
  }

  findImages(producto: ProductoTecnicoModel) {
    this.imageService.findImages('producto', producto.idProducto).subscribe({
      next: (data) => {
        this.imageList = data.map((img: any) => {
          const fullUrl = `${variables.api.url.replace(/\/$/, '')}${img.url}`;
          console.log('Imagen cargada:', fullUrl);
          return { ...img, url: fullUrl };
        });

        console.log('Lista de imágenes final:', this.imageList);
      },
      error: (error) => {
        console.error('Error al obtener imágenes:', error);
      },
    });
  }

  // ====== Guardar producto técnico
  saveProduct() {
    this.editProducto.tipoProducto = this.auxCatalogo;
    this.editProducto.estadoEquipo = this.auxEstado;
    this.productoService.create(this.editProducto).subscribe({
      next: (response) => {
        this.visibleUpdate = false;
        this.toastrService.success('Producto guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getProductos();
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          this.imageService
            .uploadImages('producto', response.entityId, this.selectedFiles)
            .subscribe({
              next: (uploadResponse) => {
                this.toastrService.success(
                  'Imágenes subidas correctamente',
                  'Éxito',
                  {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                  }
                );
              },
              error: (uploadError) => {
                console.error('Error al subir imágenes:', uploadError);
                const errMsg =
                  uploadError.error?.message || 'Error desconocido';
                this.toastrService.error(errMsg, 'Error', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
              },
            });
        }
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
  toggleModal(mode: number): void {
    switch (mode) {
      case 1:
        this.updating = false;
        this.eliminating = false;
        this.isShowingGallery = false;
        this.editProducto = new ProductoTecnicoModel();
        this.visibleUpdate = true;
        break;
      case 2:
        this.updating = true;
        this.eliminating = false;
        this.isShowingGallery = false;
        this.visibleUpdate = true;
        break;
      case 3:
        this.eliminating = true;
        this.updating = false;
        this.isShowingGallery = false;
        this.visibleUpdate = true;
        break;
      case 5:
        this.isShowingGallery = true;
        this.updating = false;
        this.eliminating = false;
        this.visibleUpdate = true;
        break;
      case 4:
        this.visibleUpdate = false;
        this.updating = false;
        this.eliminating = false;
        this.isShowingGallery = false;
        this.imageList = [];
        break;
      default:
        this.visibleUpdate = !this.visibleUpdate;
        this.cleanSelectedFiles();
    }
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
