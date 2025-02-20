import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { ToastrService } from 'ngx-toastr';
import { AdornoModel } from 'src/app/models/adorno.model';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { ColorModel } from 'src/app/models/color.model';
import { AdornoService } from 'src/app/services/adorno.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ColorService } from 'src/app/services/color.service';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-adornos',
  templateUrl: './adornos.component.html',
  styleUrls: ['./adornos.component.scss'],
})
export class AdornosComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editAdorno: AdornoModel = new AdornoModel();
  adornoList: AdornoModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  //====== Catalogo
  catalogoList: CatalogoModel[] = [];
  auxCatalogo: CatalogoModel = new CatalogoModel();
  //====== Colores
  auxColor: ColorModel = new ColorModel();
  coloresList: ColorModel[] = [];
  selectedColors: ColorModel[] = [];

  constructor(
    private adornoService: AdornoService,
    private catalogoService: CatalogoService,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdornos();
    this.getCatalogos();
    this.getColores();
  }

  cleanData() {
    this.auxCatalogo = new CatalogoModel();
    this.selectedColors = [];
  }

  // ====== Obtener adornos
  private getAdornos() {
    this.adornoService.getList().subscribe({
      next: (data: AdornoModel[]) => {
        this.adornoList = data;
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
          (c) => c.nombreCatalogo === 'Tipo adorno'
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

  saveDecoration() {
    this.editAdorno.tipoAdorno = this.auxCatalogo;
    this.editAdorno.adornoColor = this.selectedColors;
    this.adornoService.create(this.editAdorno).subscribe({
      next: (data: AdornoModel) => {
        this.editAdorno = data;
        this.visibleUpdate = false;

        this.toastrService.success('Adorno guardado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getAdornos();
      },
      error: (error) => {
        console.error('Error al guardar el adorno:', error);

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
        this.editAdorno = new AdornoModel();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditDecoration(adorno: AdornoModel) {
    this.editAdorno = { ...adorno };
    this.auxCatalogo = adorno.tipoAdorno;
    this.selectedColors = [...adorno.adornoColor];
  }

  setDeleteDecoration(adorno: AdornoModel) {
    adorno.estado = false;
    this.editAdorno = adorno;
  }

  deleteDecoration() {
    this.editAdorno.estado = false;

    this.adornoService.delete(this.editAdorno.idAdorno).subscribe({
      next: () => {
        this.toastrService.success('Adorno eliminado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        this.getAdornos();
        this.visibleUpdate = false;
      },
      error: (error) => {
        console.error('Error al eliminar el adorno:', error);
        this.toastrService.error(
          error.error?.message || 'Error desconocido',
          'Error',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
    });
  }

  updateDecoration() {
    this.editAdorno.tipoAdorno = this.auxCatalogo;

    this.editAdorno.adornoColor = this.selectedColors.filter(
      (color) => color.idColor !== 0 && color.nombre.trim() !== ''
    );

    const adorno = this.adornoService
      .update(this.editAdorno.idAdorno, this.editAdorno)
      .subscribe({
        next: (data: AdornoModel) => {
          this.editAdorno = data;
          this.visibleUpdate = false;

          this.toastrService.success(
            'Adorno actualizado correctamente',
            'Éxito',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.getAdornos();
          console.log('Adorno actualizado:', adorno);
        },
        error: (error) => {
          console.error('Error al actualizar el adorno:', error);

          const errorMessage = error.error?.message || 'Error desconocido';
          this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
  }

  selectColorAdorno(event: ColorModel) {
    if (!this.selectedColors.some((c) => c.idColor === event.idColor)) {
      this.selectedColors.push(event);
    }
  }
}
