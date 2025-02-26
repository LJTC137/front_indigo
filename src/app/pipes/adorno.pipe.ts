import { Pipe, PipeTransform } from '@angular/core';
import { AdornoModel } from '../models/adorno.model';

@Pipe({
  name: 'adornoNombre',
})
export class AdornoNombrePipe implements PipeTransform {
  transform(adornos: AdornoModel[], searchTerm: string): AdornoModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return adornos;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return adornos.filter((adorno: AdornoModel) =>
      adorno.nombre.toLowerCase().includes(searchTermLower)
    );
  }
}
