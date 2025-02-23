import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { CateringModel } from 'src/app/models/catering.model';
import { CateringService } from 'src/app/services/catering.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { ImageService } from 'src/app/services/images.service';
import { ImageModel } from 'src/app/models/image.model';

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
  imageList: ImageModel[] = [];
  isShowingGallery: boolean = false;

  constructor(
    private cateringService: CateringService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService,
    private imageService: ImageService
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

  // Dentro de AdornosComponent
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

  findImages(catering: CateringModel) {
    this.imageService.findImages('catering', catering.idCatering).subscribe({
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

  // ====== Guardar catering
  saveCatering() {
    console.log(this.editCatering);
    this.cateringService.create(this.editCatering).subscribe({
      next: (response) => {
        this.visibleUpdate = false;
        this.toastrService.success('Catering guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getCaterings();
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          this.imageService
            .uploadImages('catering', response.entityId, this.selectedFiles)
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
  toggleModal(mode: number): void {
    switch (mode) {
      case 1:
        this.updating = false;
        this.eliminating = false;
        this.isShowingGallery = false;
        this.editCatering = new CateringModel();
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
        this.cleanSelectedFiles();
        this.cleanData();
        break;
      default:
        this.visibleUpdate = !this.visibleUpdate;
        this.cleanSelectedFiles();
    }
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
