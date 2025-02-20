import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { CateringModel } from 'src/app/models/catering.model';
import { CateringService } from 'src/app/services/catering.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.scss'],
})
export class CateringComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editCatering: CateringModel = new CateringModel();
  cateringList: CateringModel[] = [];
  catalogoList: CatalogoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  auxCatalogo: CatalogoModel = new CatalogoModel();

  constructor(
    private cateringService: CateringService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCaterings();
    this.getCatalogos();
  }

  // ====== Obtener catering
  private getCaterings() {
    this.cateringService.getList().subscribe({
      next: (data: CateringModel[]) => {
        this.cateringList = data;
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // ====== Obtener catalogos
  private getCatalogos() {
    this.catalogoService.getList().subscribe({
      next: (data: CatalogoModel[]) => {
        this.catalogoList = data.filter(
          (c) => c.nombreCatalogo === 'Tipo catering'
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

  // ====== Guardar catering
  saveCatering() {
    this.editCatering.tipoCatering = this.auxCatalogo;
    this.cateringService.create(this.editCatering).subscribe({
      next: (data: CateringModel) => {
        this.editCatering = data;
        this.visibleUpdate = false;
        this.toastrService.success('Catering guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getCaterings();
      },
      error: (error) => {
        console.error('Error al guardar el catering:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar catering
  updateCatering() {
    this.cateringService
      .update(this.editCatering.idCatering, this.editCatering)
      .subscribe({
        next: (data: CateringModel) => {
          this.editCatering = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Catering actualizado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getCaterings();
        },
        error: (error) => {
          console.error('Error al actualizar el catering:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  // ====== Eliminar catering
  deleteCatering() {
    this.editCatering.estado = false;
    this.cateringService
      .update(this.editCatering.idCatering, this.editCatering)
      .subscribe({
        next: (data: CateringModel) => {
          this.editCatering = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Catering eliminado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getCaterings();
        },
        error: (error) => {
          console.error('Error al eliminar el catering:', error);
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
        this.editCatering = new CateringModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  cleanData() {
    this.auxCatalogo = new CatalogoModel();
  }

  setEditCatering(catering: CateringModel) {
    this.editCatering.tipoCatering = this.auxCatalogo;
    this.editCatering = catering;
  }

  setDeleteCatering(catering: CateringModel) {
    catering.estado = false;
    this.editCatering = catering;
  }

  selectTipoCatering(catalogo: CatalogoModel) {
    this.auxCatalogo = catalogo;
    this.editCatering.tipoCatering = catalogo;
  }
}
