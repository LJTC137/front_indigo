import { Pipe, PipeTransform } from '@angular/core';
import { EquipoServicioModel } from '../models/equipo-servicio.model';

@Pipe({
  name: 'equipoCantidadPersonas',
})
export class EquipoCantidadPersonasPipe implements PipeTransform {
  transform(
    equipos: EquipoServicioModel[],
    cantidad: number
  ): EquipoServicioModel[] {
    if (!cantidad || cantidad <= 0) {
      return equipos;
    }

    return equipos.filter(
      (equipo: EquipoServicioModel) => equipo.cantidadPersonas === cantidad
    );
  }
}
