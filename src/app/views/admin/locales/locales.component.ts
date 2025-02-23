import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { LocalModel } from 'src/app/models/local.model';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { LocalService } from 'src/app/services/local.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/images.service';

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
  isShowingGallery: boolean = false;
  imageList: ImageModel[] = [];

  constructor(
    private localService: LocalService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService,
    private imageService: ImageService
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

  findImages(local: LocalModel) {
    this.imageService.findImages('local', local.idLocal).subscribe({
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

  // ====== Guardar local
  saveLocal() {
    this.editLocal.tipoLocal = this.auxCatalogo;
    this.editLocal.estadoDisponibilidad = this.auxEstado;
    this.localService.create(this.editLocal).subscribe({
      next: (response) => {
        this.visibleUpdate = false;
        this.toastrService.success('Local guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getLocales();
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          this.imageService
            .uploadImages('local', response.entityId, this.selectedFiles)
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
  toggleModal(mode: number): void {
    switch (mode) {
      case 1:
        this.updating = false;
        this.eliminating = false;
        this.isShowingGallery = false;
        this.editLocal = new LocalModel();
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
