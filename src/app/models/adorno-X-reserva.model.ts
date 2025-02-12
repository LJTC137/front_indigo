import { AdornoModel } from "./adorno.model";
import { ReservaModel } from "./reserva.model";

export class AdornoXReservaModel {
  idAdornoXReserva: number = 0;
  adorno : AdornoModel = new AdornoModel();
  reserva : ReservaModel = new ReservaModel();
  color: string = '';
  cantidadAdornos: number = 0;
}
