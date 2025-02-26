import { Pipe, PipeTransform } from '@angular/core';
import { MontajeModel } from '../models/montaje.model';

@Pipe({
  name: 'montajeNombre',
})
export class MontajeNombrePipe implements PipeTransform {
  transform(montajes: MontajeModel[], searchTerm: string): MontajeModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return montajes;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return montajes.filter((montaje: MontajeModel) =>
      montaje.nombre.toLowerCase().includes(searchTermLower)
    );
  }
}
