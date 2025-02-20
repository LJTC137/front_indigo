import { CatalogoModel } from './catalogo.model';

export class EquipoServicioModel {
  idEquipo: number = 0;
  descripcion: string = '';
  tarifaXEvento: number = 0;
  cantidadPersonas: number = 0;
  estado: boolean = true;
  precioXHora: number = 0;
  esDisponible: boolean = false;
  tipoContratacion: CatalogoModel = new CatalogoModel();
  tipoEquipo: CatalogoModel = new CatalogoModel();
}
