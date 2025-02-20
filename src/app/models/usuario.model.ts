import { TipoUsuarioModel } from './tipo-usuario.model';

export class UsuarioModel {
  idUsuario: number = 0;
  nombres: string = '';
  identificacion: string = '';
  correo: string = '';
  contrasenia: string = '';
  estado: boolean = true;
  tipo_usuario: TipoUsuarioModel[] = [];
}
