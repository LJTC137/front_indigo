import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { MontajeModel } from 'src/app/models/montaje.model';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { MontajeService } from 'src/app/services/montaje.service';

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

  // Auxiliar para selección de catálogos
  auxTipoMontaje: CatalogoModel = new CatalogoModel();
  auxTipoCobro: CatalogoModel = new CatalogoModel();
  // Listas de catálogos
  catalogoList: CatalogoModel[] = []; // Para "Tipo de montaje"
  cobroList: CatalogoModel[] = []; // Para "Tipo de cobro"

  constructor(
    private montajeService: MontajeService,
    private catalogoService: CatalogoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMontajes();
    this.getCatalogos();
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

  // ====== Guardar montaje
  saveMontaje() {
    // Asignar los catálogos seleccionados
    this.editMontaje.tipoMontaje = this.auxTipoMontaje;
    this.editMontaje.tipoCobro = this.auxTipoCobro;
    this.montajeService.create(this.editMontaje).subscribe({
      next: (data: MontajeModel) => {
        this.editMontaje = data;
        this.visibleUpdate = false;
        this.toastrService.success('Montaje guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getMontajes();
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
        this.editMontaje = new MontajeModel();
        this.auxTipoMontaje = new CatalogoModel();
        this.auxTipoCobro = new CatalogoModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
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
