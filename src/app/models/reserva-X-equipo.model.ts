import { ReservaModel } from './reserva.model';
import { EquipoServicioModel } from './equipo-servicio.model';

export class ReservaXEquipoModel {
  idReservaXEquipo: number = 0;
  reserva: ReservaModel = new ReservaModel();
  equipo: EquipoServicioModel = new EquipoServicioModel();
  horaXServicio: number = 0;
}
