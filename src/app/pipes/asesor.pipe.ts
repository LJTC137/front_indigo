import { Pipe, PipeTransform } from '@angular/core';
import { AsesorModel } from '../models/asesor.model';

@Pipe({
  name: 'asesorNombre',
})
export class AsesorNombrePipe implements PipeTransform {
  transform(asesores: AsesorModel[], searchTerm: string): AsesorModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return asesores;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return asesores.filter((asesor: AsesorModel) =>
      asesor.nombreCompleto.toLowerCase().includes(searchTermLower)
    );
  }
}
