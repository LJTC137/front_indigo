import { Pipe, PipeTransform } from '@angular/core';
import { ReservaModel } from '../models/reserva.model';

@Pipe({
  name: 'reservaNombre',
})
export class ReservaNombrePipe implements PipeTransform {
  transform(reservas: ReservaModel[], searchTerm: string): ReservaModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return reservas;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return reservas.filter((reserva: ReservaModel) =>
      reserva.nombreClienteReserva.toLowerCase().includes(searchTermLower)
    );
  }
}
