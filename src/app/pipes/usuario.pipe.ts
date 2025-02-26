import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Pipe({
  name: 'usuarioIdentificacion',
})
export class UsuarioIdentificacionPipe implements PipeTransform {
  transform(usuarios: UsuarioModel[], searchTerm: string): UsuarioModel[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return usuarios;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return usuarios.filter((usuario: UsuarioModel) =>
      usuario.identificacion.toLowerCase().includes(searchTermLower)
    );
  }
}
