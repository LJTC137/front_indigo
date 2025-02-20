import { CatalogoModel } from './catalogo.model';

export class LocalModel {
  idLocal: number = 0;
  nombreLocal: string = '';
  sector: string = '';
  direccion: string = '';
  dimensiones: string = '';
  tarifaXHora: number = 0;
  tarifaXDia: number = 0;
  aforo: number = 0;
  descripcion: string = '';
  tipoLocal: CatalogoModel = new CatalogoModel();
  estadoDisponibilidad: CatalogoModel = new CatalogoModel();
  estado: boolean = true;
}
