import { Pipe, PipeTransform } from '@angular/core';
import { CatalogoModel } from '../models/catalogo.model';

@Pipe({
  name: 'catalogoNombre',
})
export class CatalogoNombrePipe implements PipeTransform {
  transform(catalogos: CatalogoModel[], searchTerm: string): CatalogoModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return catalogos;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return catalogos.filter((catalogo: CatalogoModel) =>
      catalogo.nombreCatalogo.toLowerCase().includes(searchTermLower)
    );
  }
}
