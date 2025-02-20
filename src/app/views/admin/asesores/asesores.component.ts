import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AsesorModel } from 'src/app/models/asesor.model';
import { AsesorService } from 'src/app/services/asesor.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.scss'],
})
export class AsesoresComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  asesorList: AsesorModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  editAsesor: AsesorModel = new AsesorModel();
  visibleUpdate: boolean = false;

  constructor(
    private asesorService: AsesorService,
    private toastrService: ToastrService
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

  // ====== Guardar asesor
  saveAsesor() {
    this.asesorService.create(this.editAsesor).subscribe({
      next: (data: AsesorModel) => {
        this.editAsesor = data;
        this.visibleUpdate = false;
        this.toastrService.success('Asesor guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getAsesores();
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
        this.editAsesor = new AsesorModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditAsesor(asesor: AsesorModel) {
    this.editAsesor = asesor;
  }

  setDeleteAsesor(asesor: AsesorModel) {
    asesor.estado = false;
    this.editAsesor = asesor;
  }
}
