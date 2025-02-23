import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { MontajeModel } from 'src/app/models/montaje.model';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { MontajeService } from 'src/app/services/montaje.service';
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/images.service';

@Component({
  selector: 'app-montajes',
  templateUrl: './montajes.component.html',
  styleUrls: ['./montajes.component.scss'],
})
export class MontajesComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editMontaje: MontajeModel = new MontajeModel();
  montajeList: MontajeModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  isShowingGallery: boolean = false;
  imageList: ImageModel[] = [];

  // Auxiliar para selección de catálogos
  auxTipoMontaje: CatalogoModel = new CatalogoModel();
  auxTipoCobro: CatalogoModel = new CatalogoModel();
  // Listas de catálogos
  catalogoList: CatalogoModel[] = []; // Para "Tipo de montaje"
  cobroList: CatalogoModel[] = []; // Para "Tipo de cobro"

  constructor(
    private montajeService: MontajeService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getMontajes();
    this.getCatalogos();
  }

  cleanData() {
    this.auxTipoMontaje = new CatalogoModel();
    this.auxTipoCobro = new CatalogoModel();
  }

  // ====== Obtener montajes
  private getMontajes() {
    this.montajeService.getList().subscribe({
      next: (data: MontajeModel[]) => {
        this.montajeList = data;
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // ====== Obtener catálogos para Tipo de montaje y Tipo de cobro
  private getCatalogos() {
    this.catalogoService.getList().subscribe({
      next: (data: CatalogoModel[]) => {
        this.catalogoList = data.filter(
          (c) => c.nombreCatalogo === 'Tipo montaje'
        );
        this.cobroList = data.filter((c) => c.nombreCatalogo === 'Tipo cobro');
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

  findImages(montaje: MontajeModel) {
    this.imageService.findImages('montaje', montaje.idMontaje).subscribe({
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

  // ====== Guardar montaje
  saveMontaje() {
    // Asignar los catálogos seleccionados
    this.editMontaje.tipoMontaje = this.auxTipoMontaje;
    this.editMontaje.tipoCobro = this.auxTipoCobro;
    console.log(this.editMontaje);

    this.montajeService.create(this.editMontaje).subscribe({
      next: (response) => {
        this.visibleUpdate = false;
        this.toastrService.success('Montaje guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getMontajes();
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          this.imageService
            .uploadImages('montaje', response.entityId, this.selectedFiles)
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
        console.error('Error al guardar el montaje:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar montaje
  updateMontaje() {
    this.montajeService
      .update(this.editMontaje.idMontaje, this.editMontaje)
      .subscribe({
        next: (data: MontajeModel) => {
          this.editMontaje = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Montaje actualizado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getMontajes();
        },
        error: (error) => {
          console.error('Error al actualizar el montaje:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  // ====== Eliminar montaje
  deleteMontaje() {
    this.editMontaje.estado = false;
    this.montajeService
      .update(this.editMontaje.idMontaje, this.editMontaje)
      .subscribe({
        next: (data: MontajeModel) => {
          this.editMontaje = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Montaje eliminado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getMontajes();
        },
        error: (error) => {
          console.error('Error al eliminar el montaje:', error);
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
        this.editMontaje = new MontajeModel();
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

  // ====== Asignar montaje para edición
  setEditMontaje(montaje: MontajeModel) {
    this.editMontaje = { ...montaje };
    this.auxTipoMontaje = montaje.tipoMontaje;
    this.auxTipoCobro = montaje.tipoCobro;
  }

  // ====== Asignar montaje para eliminación
  setDeleteMontaje(montaje: MontajeModel) {
    montaje.estado = false;
    this.editMontaje = montaje;
  }

  // ====== Seleccionar Tipo de montaje
  selectTipoMontaje(catalogo: CatalogoModel) {
    this.auxTipoMontaje = catalogo;
    this.editMontaje.tipoMontaje = catalogo;
  }

  // ====== Seleccionar Tipo de cobro
  selectTipoCobro(catalogo: CatalogoModel) {
    this.auxTipoCobro = catalogo;
    this.editMontaje.tipoCobro = catalogo;
  }
}
