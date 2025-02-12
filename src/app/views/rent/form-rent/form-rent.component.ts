import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AsesorModel } from 'src/app/models/asesor.model';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-form-rent',
  templateUrl: './form-rent.component.html',
  styleUrls: ['./form-rent.component.scss'],
})
export class FormRentComponent {
  rutas = variables;
  icons = freeSet;
  //============== Asesor
  asesorList: AsesorModel[] = [];
  auxAsesor: AsesorModel = new AsesorModel();
  //============== Adornos
  adornosList: AsesorModel[] = [];
  auxAdorno: AsesorModel = new AsesorModel();
  //============== Catalogo
  catalogoList: CatalogoModel[] = [];
  auxEstadoReserva: CatalogoModel = new CatalogoModel();
  auxTipoEvento: CatalogoModel = new CatalogoModel();
  chooseAsesor: boolean = false;
  chooseAdornos: boolean = false;
  chooseProductos: boolean = false;
  chooseCatering: boolean = false;
  chooseEquipo: boolean = false;
  chooseLocal: boolean = false;
  chooseMontaje: boolean = false;
  visible = false;

  selectionModal(option: string) {
    switch (option) {
      case 'asesor':
        this.chooseAsesor = true;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        break;
      case 'adornos':
        this.chooseAsesor = false;
        this.chooseAdornos = true;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        break;
      case 'productos':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = true;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        break;
      case 'catering':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = true;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        break;
      case 'equipo':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = true;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        break;
      case 'local':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = true;
        this.chooseMontaje = false;
        break;
      case 'montaje':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = true;
        break;
    }
    this.toggleModal();
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

  selectAsesor(asesor: AsesorModel) {
    this.auxAsesor = asesor;
  }

  selectEstadoReserva(estadoReserva: CatalogoModel) {
    this.auxEstadoReserva = estadoReserva;
  }

  selectTipoEvento(tipoEvento: CatalogoModel) {
    this.auxTipoEvento = tipoEvento;
  }
}
