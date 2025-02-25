import { AsesorModel } from './asesor.model';
import { CatalogoModel } from './catalogo.model';
import { CateringModel } from './catering.model';
import { LocalModel } from './local.model';
import { MontajeModel } from './montaje.model';
import { ProductoTecnicoModel } from './producto-tecnico.model';

export class ReservaModel {
  idReserva: number = 0;
  nombreClienteReserva: string = '';
  identificacionClienteReserva: string = '';
  telefonoClienteReserva: string = '';
  cantidadPersonas: number = 0;
  horaInicio: string = '';
  horaFin: string = '';
  fechaInicioEvento: Date = new Date();
  fechaFinEvento: Date = new Date();
  asesor: AsesorModel = new AsesorModel();
  tipoEvento: CatalogoModel = new CatalogoModel();
  estadoReserva: CatalogoModel = new CatalogoModel();
  reservaCatering: CateringModel[] = [];
  local: LocalModel = new LocalModel();
  montaje: MontajeModel = new MontajeModel();
  reservaProducto: ProductoTecnicoModel[] = [];
  fechaRegistro: Date = new Date();
  cantidadSillas: number = 0;
  cantidadMesas: number = 0;
  cantidadPack: number = 0;
  costoMontaje: number = 0;
  costoAdornos: number = 0;
  costoServicio: number = 0;
  costoTotal: number = 0;
  estado: boolean = true;
}
