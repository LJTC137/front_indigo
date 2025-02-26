import { Pipe, PipeTransform } from '@angular/core';
import { ProductoTecnicoModel } from '../models/producto-tecnico.model';

@Pipe({
  name: 'productoTecnicoNombre',
})
export class ProductoTecnicoNombrePipe implements PipeTransform {
  transform(
    productos: ProductoTecnicoModel[],
    searchTerm: string
  ): ProductoTecnicoModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return productos;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return productos.filter((producto: ProductoTecnicoModel) =>
      producto.nombre.toLowerCase().includes(searchTermLower)
    );
  }
}
