import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { ToastrService } from 'ngx-toastr';
import { ColorModel } from 'src/app/models/color.model';
import { ColorService } from 'src/app/services/color.service';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss'],
})
export class ColoresComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  coloresList: ColorModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  editColor: ColorModel = new ColorModel();
  visibleUpdate: boolean = false;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColores();
  }

  // ====== Obtener colores
  private getColores() {
    this.colorService.getList().subscribe({
      next: (data: ColorModel[]) => {
        this.coloresList = data;
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // ====== Guardar color
  saveColor() {
    this.colorService.create(this.editColor).subscribe({
      next: (data: ColorModel) => {
        this.editColor = data;
        this.visibleUpdate = false;

        this.toastrService.success('Color guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getColores();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Actualizar color
  updateColor() {
    this.colorService.update(this.editColor.idColor, this.editColor).subscribe({
      next: (data: ColorModel) => {
        this.editColor = data;
        this.visibleUpdate = false;

        this.toastrService.success('Color actualizado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });

        this.getColores();
      },
      error: (error) => {
        console.error('Error al actualizar el color:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  // ====== Eliminar color
  deleteColor() {
    this.editColor.estado = false;
    this.colorService.update(this.editColor.idColor, this.editColor).subscribe({
      next: (data: ColorModel) => {
        this.editColor = data;
        this.visibleUpdate = false;

        this.toastrService.success('Color eliminado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getColores();
      },
      error: (error) => {
        console.error('Error al eliminar el color:', error);

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
        this.editColor = new ColorModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditColor(color: ColorModel) {
    this.editColor = color;
  }

  setDeleteColor(color: ColorModel) {
    color.estado = false;
    this.editColor = color;
  }
}
