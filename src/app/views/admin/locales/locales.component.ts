import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { LocalModel } from 'src/app/models/local.model';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { LocalService } from 'src/app/services/local.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss'],
})
export class LocalesComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editLocal: LocalModel = new LocalModel();
  localList: LocalModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  auxEstado: CatalogoModel = new CatalogoModel();
  auxCatalogo: CatalogoModel = new CatalogoModel();
  catalogoList: CatalogoModel[] = [];
  estadosList: CatalogoModel[] = [];

  constructor(
    private localService: LocalService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLocales();
    this.getCatalogos();
  }

  cleanData() {
    this.auxCatalogo = new CatalogoModel();
    this.auxEstado = new CatalogoModel();
  }

  // ====== Obtener locales
  private getLocales() {
    this.localService.getList().subscribe({
      next: (data: LocalModel[]) => {
        this.localList = data;
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
          (c) => c.nombreCatalogo === 'Tipo local'
        );
        this.estadosList = data.filter(
          (c) => c.nombreCatalogo === 'Disponibilidad local'
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

  // ====== Guardar local
  saveLocal() {
    this.editLocal.tipoLocal = this.auxCatalogo;
    this.editLocal.estadoDisponibilidad = this.auxEstado;
    this.localService.create(this.editLocal).subscribe({
      next: (data: LocalModel) => {
        this.editLocal = data;
        this.visibleUpdate = false;
        this.toastrService.success('Local guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getLocales();
      },
      error: (error) => {
        console.error('Error al guardar el local:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar local
  updateLocal() {
    this.editLocal.tipoLocal = this.auxCatalogo;
    this.editLocal.estadoDisponibilidad = this.auxEstado;
    this.localService.update(this.editLocal.idLocal, this.editLocal).subscribe({
      next: (data: LocalModel) => {
        this.editLocal = data;
        this.visibleUpdate = false;
        this.toastrService.success('Local actualizado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getLocales();
      },
      error: (error) => {
        console.error('Error al actualizar el local:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Eliminar local
  deleteLocal() {
    this.editLocal.estado = false;
    this.localService.update(this.editLocal.idLocal, this.editLocal).subscribe({
      next: (data: LocalModel) => {
        this.editLocal = data;
        this.visibleUpdate = false;
        this.toastrService.success('Local eliminado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getLocales();
      },
      error: (error) => {
        console.error('Error al eliminar el local:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Switch de visibilidad del modal
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
    this.auxCatalogo = local.tipoLocal;
    this.auxEstado = local.estadoDisponibilidad;
    this.editLocal = { ...local };
  }

  setDeleteLocal(local: LocalModel) {
    local.estado = false;
    this.editLocal = local;
  }

  selectTipoLocal(catalogo: CatalogoModel) {
    this.auxCatalogo = catalogo;
    this.editLocal.tipoLocal = catalogo;
  }

  selectStateLocal(catalogo: CatalogoModel) {
    this.editLocal.estadoDisponibilidad = catalogo;
  }
}
