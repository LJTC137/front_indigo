import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { EquipoServicioModel } from 'src/app/models/equipo-servicio.model';
import { EquipoServicioService } from 'src/app/services/equipo-servicio.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-equipo-servicio',
  templateUrl: './equipo-servicio.component.html',
  styleUrls: ['./equipo-servicio.component.scss'],
})
export class EquipoServicioComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editEquipo: EquipoServicioModel = new EquipoServicioModel();
  equipoList: EquipoServicioModel[] = [];
  // Lista de catálogos para Tipo de Equipo y de contratación
  catalogoList: CatalogoModel[] = [];
  contratosList: CatalogoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;

  constructor(
    private equipoServicioService: EquipoServicioService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEquipos();
    this.getCatalogos();
  }

  // ====== Obtener equipos de servicio
  private getEquipos() {
    this.equipoServicioService.getList().subscribe({
      next: (data: EquipoServicioModel[]) => {
        this.equipoList = data;
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
        // Para Tipo de equipo
        this.catalogoList = data.filter(
          (c) => c.nombreCatalogo === 'Tipo equipo'
        );
        // Para Tipo de contratación
        this.contratosList = data.filter(
          (c) => c.nombreCatalogo === 'Tipo contratación'
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

  // ====== Guardar equipo de servicio
  saveEquipo() {
    this.equipoServicioService.create(this.editEquipo).subscribe({
      next: (data: EquipoServicioModel) => {
        this.editEquipo = data;
        this.visibleUpdate = false;
        this.toastrService.success(
          'Equipo de servicio guardado correctamente',
          'Éxito',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }
        );
        this.getEquipos();
      },
      error: (error) => {
        console.error('Error al guardar el equipo:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar equipo de servicio
  updateEquipo() {
    this.equipoServicioService
      .update(this.editEquipo.idEquipo, this.editEquipo)
      .subscribe({
        next: (data: EquipoServicioModel) => {
          this.editEquipo = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Equipo de servicio actualizado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getEquipos();
        },
        error: (error) => {
          console.error('Error al actualizar el equipo:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  // ====== Eliminar equipo de servicio
  deleteEquipo() {
    this.editEquipo.estado = false;
    this.equipoServicioService
      .update(this.editEquipo.idEquipo, this.editEquipo)
      .subscribe({
        next: (data: EquipoServicioModel) => {
          this.editEquipo = data;
          this.visibleUpdate = false;
          this.toastrService.success(
            'Equipo de servicio eliminado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getEquipos();
        },
        error: (error) => {
          console.error('Error al eliminar el equipo:', error);
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
        this.editEquipo = new EquipoServicioModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  seteditEquipo(equipo: EquipoServicioModel) {
    // Asignamos el objeto seleccionado para editar
    this.editEquipo = { ...equipo };
  }

  setDeleteEquipo(equipo: EquipoServicioModel) {
    equipo.estado = false;
    this.editEquipo = equipo;
  }

  selectTipoEquipo(catalogo: CatalogoModel) {
    this.editEquipo.tipoEquipo = catalogo;
  }

  selectTipoContratacion(catalogo: CatalogoModel) {
    this.editEquipo.tipoContratacion = catalogo;
  }
}
