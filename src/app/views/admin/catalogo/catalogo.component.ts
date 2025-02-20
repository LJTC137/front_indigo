import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { ToastrService } from 'ngx-toastr';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  catalogoList: CatalogoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  editCategory: CatalogoModel = new CatalogoModel();
  visibleUpdate: boolean = false;

  constructor(
    private catalogoService: CatalogoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCatalogos();
  }

  // ====== Obtener catalogos
  private getCatalogos() {
    this.catalogoService.getList().subscribe({
      next: (data: CatalogoModel[]) => {
        this.catalogoList = data;
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // ====== Guardar categoria
  saveCategory() {
    this.catalogoService.create(this.editCategory).subscribe({
      next: (data: CatalogoModel) => {
        this.editCategory = data;
        this.visibleUpdate = false;
        this.toastrService.success(
          'Categoría guardada correctamente',
          'Éxito',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }
        );
        this.getCatalogos();
      },
      error: (error) => {
        console.error('Error al guardar el adorno:', error);

        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar categoria
  updateCategory() {
    this.catalogoService
      .update(this.editCategory.idCatalogo, this.editCategory)
      .subscribe({
        next: (data: CatalogoModel) => {
          this.editCategory = data;
          this.visibleUpdate = false;

          this.toastrService.success(
            'Categoría actualizada correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getCatalogos();
        },
        error: (error) => {
          console.error('Error al actualizar la categoría:', error);

          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

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

  setDeleteCategory(category: CatalogoModel) {
    category.estado = false;
    this.editCategory = category;
  }

  deleteCategory() {
    this.editCategory.estado = false;
    this.catalogoService
      .update(this.editCategory.idCatalogo, this.editCategory)
      .subscribe({
        next: (data: CatalogoModel) => {
          this.editCategory = data;
          this.visibleUpdate = false;

          this.toastrService.success(
            'Catalogo eliminado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getCatalogos();
        },
        error: (error) => {
          console.error('Error al eliminar el catalogo:', error);

          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }
}
