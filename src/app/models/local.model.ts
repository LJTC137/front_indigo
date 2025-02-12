import { CatalogoModel } from './catalogo.model';

export class LocalModel {
  idLocal: number = 0;
  direccion: string = '';
  sector: string = '';
  nombreLocal: string = '';
  descripcion: string = '';
  dimensiones: string = '';
  estado: boolean = false;
  tarifaXHora: number = 0;
  tarifaXDia: number = 0;
  aforo: number = 0;
  estadoDisponibilidad: CatalogoModel = new CatalogoModel();
  tipoLocal: CatalogoModel = new CatalogoModel();
}
