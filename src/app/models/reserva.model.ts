import { AsesorModel } from './asesor.model';
import { CatalogoModel } from './catalogo.model';
import { CateringModel } from './catering.model';
import { LocalModel } from './local.model';
import { MontajeModel } from './montaje.model';
import { ProductoTecnicoModel } from './producto-tecnico.model';
import { UsuarioModel } from './usuario.model';

export class ReservaModel {
  idReserva: number = 0;
  nombreClienteReserva: string = ''; // ya
  cedulaClienteReserva: string = ''; // ya 
  telefonoClienteReserva: string = ''; // ya
  cantidadPersonas: number = 0; // ya
  horaInicio: string = ''; // ya
  horaFin: string = ''; // ya
  fechaInicioEvento: Date = new Date(); // ya
  fechaFinEvento: Date = new Date(); // ya
  asesor: AsesorModel = new AsesorModel(); // ya
  tipoEvento: CatalogoModel = new CatalogoModel(); // ya
  estadoReserva: CatalogoModel = new CatalogoModel(); // ya
  reservaCatering: CateringModel[] = []; // ya
  local: LocalModel = new LocalModel(); // ya
  montaje: MontajeModel = new MontajeModel(); // ya
  reservaProducto: ProductoTecnicoModel[] = []; // ya
  usuario: UsuarioModel = new UsuarioModel(); // ya
  fechaRegistro: Date = new Date(); // ya
  cantidadSillas: number = 0; // ya
  cantidadMesas: number = 0; // ya
  costoMontaje: number = 0;
  costoAdornos: number = 0;
  costoServicio: number = 0;
  costoTotal: number = 0;
  estado: boolean = true; // ya
}
