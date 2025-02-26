import { Pipe, PipeTransform } from '@angular/core';
import { CateringModel } from '../models/catering.model';

@Pipe({
  name: 'cateringNombre'
})
export class CateringNombrePipe implements PipeTransform {
  transform(caterings: CateringModel[], searchTerm: string): CateringModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return caterings;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return caterings.filter((catering: CateringModel) =>
      catering.nombreServicio.toLowerCase().includes(searchTermLower)
    );
  }
}
