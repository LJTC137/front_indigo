import { Pipe, PipeTransform } from '@angular/core';
import { LocalModel } from '../models/local.model';

@Pipe({
  name: 'localFiltro',
})
export class LocalFiltroPipe implements PipeTransform {
  transform(
    locales: LocalModel[],
    searchTerm: string,
    field: 'aforo' | 'nombreLocal' | 'sector'
  ): LocalModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return locales;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return locales.filter((local: LocalModel) => {
      if (field === 'aforo') {
        return local.aforo === Number(searchTerm);
      }
      return local[field].toLowerCase().includes(searchTermLower);
    });
  }
}
