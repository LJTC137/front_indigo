import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AsesorModel } from 'src/app/models/asesor.model';
import { AsesorService } from 'src/app/services/asesor.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/images.service';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.scss'],
})
export class AsesoresComponent implements OnInit {
  searchTerm:any
  rutas = variables;
  icons = freeSet;
  asesorList: AsesorModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  editAsesor: AsesorModel = new AsesorModel();
  visibleUpdate: boolean = false;
  isShowingGallery: boolean = false;
  imageList: ImageModel[] = [];

  constructor(
    private asesorService: AsesorService,
    private toastrService: ToastrService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getAsesores();
  }

  // ====== Obtener asesores
  private getAsesores() {
    this.asesorService.getList().subscribe({
      next: (data: AsesorModel[]) => {
        this.asesorList = data;
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

  findImages(asesor: AsesorModel) {
    this.imageService.findImages('asesor', asesor.idAsesor).subscribe({
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

  // ====== Guardar asesor
  saveAsesor() {
    this.asesorService.create(this.editAsesor).subscribe({
      next: (response) => {
        this.visibleUpdate = false;
        this.toastrService.success('Asesor guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getAsesores();
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          this.imageService
            .uploadImages('asesor', response.entityId, this.selectedFiles)
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
        console.error('Error al guardar el asesor:', error);

        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar asesor
  updateAsesor() {
    this.asesorService
      .update(this.editAsesor.idAsesor, this.editAsesor)
      .subscribe({
        next: (data: AsesorModel) => {
          this.editAsesor = data;
          this.visibleUpdate = false;

          this.toastrService.success(
            'Asesor actualizado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getAsesores();
        },
        error: (error) => {
          console.error('Error al actualizar el asesor:', error);

          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  // ====== Eliminar asesor
  deleteAsesor() {
    this.editAsesor.estado = false;
    this.asesorService
      .update(this.editAsesor.idAsesor, this.editAsesor)
      .subscribe({
        next: (data: AsesorModel) => {
          this.editAsesor = data;
          this.visibleUpdate = false;

          this.toastrService.success(
            'Asesor eliminado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getAsesores();
        },
        error: (error) => {
          console.error('Error al eliminar el asesor:', error);

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
        this.editAsesor = new AsesorModel();
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
        break;
      default:
        this.visibleUpdate = !this.visibleUpdate;
        this.cleanSelectedFiles();
    }
  }

  setEditAsesor(asesor: AsesorModel) {
    this.editAsesor = asesor;
  }

  setDeleteAsesor(asesor: AsesorModel) {
    asesor.estado = false;
    this.editAsesor = asesor;
  }
}
