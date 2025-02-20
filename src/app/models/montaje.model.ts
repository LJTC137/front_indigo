import { CatalogoModel } from './catalogo.model';

export class MontajeModel {
  idMontaje: number = 0;
  descripcion: string = '';
  esDisponible: boolean = false;
  estado: boolean = true;
  capacidadMaxima: number = 0;
  costoMesa: number = 0;
  costoSilla: number = 0;
  costoPack: number = 0;
  depositoReembolsable: number = 0;
  nombre: string = ''; //ya
  tipoCobro: CatalogoModel = new CatalogoModel();
  tipoMontaje: CatalogoModel = new CatalogoModel();
}
