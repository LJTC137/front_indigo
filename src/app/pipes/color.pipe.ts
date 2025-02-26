import { Pipe, PipeTransform } from '@angular/core';
import { ColorModel } from '../models/color.model';

@Pipe({
  name: 'colorNombre',
})
export class ColorNombrePipe implements PipeTransform {
  transform(colores: ColorModel[], searchTerm: string): ColorModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return colores;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return colores.filter((color: ColorModel) =>
      color.nombre.toLowerCase().includes(searchTermLower)
    );
  }
}
