import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { variables } from 'src/app/variables';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { TipoUsuarioModel } from 'src/app/models/tipo-usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  editUsuario: UsuarioModel = new UsuarioModel();
  usuarioList: UsuarioModel[] = [];
  tipoUsuarioList: TipoUsuarioModel[] = [];
  selectedTipoUsuario: TipoUsuarioModel[] = [];
  updating: boolean = false;
  eliminating: boolean = false;
  visibleUpdate: boolean = false;
  auxTipoUsuario: TipoUsuarioModel = new TipoUsuarioModel();

  constructor(
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
    this.getTipoUsuarios();
  }

  cleanData() {
    this.auxTipoUsuario = new TipoUsuarioModel();
    this.selectedTipoUsuario = [];
  }

  private getUsuarios() {
    this.usuarioService.getList().subscribe({
      next: (data: UsuarioModel[]) => {
        this.usuarioList = data;
      },
      error: () => {
        this.toastrService.error('Error al obtener los usuarios', 'Error');
      },
    });
  }

  private getTipoUsuarios() {
    this.tipoUsuarioService.getList().subscribe({
      next: (data: TipoUsuarioModel[]) => {
        this.tipoUsuarioList = data;
      },
      error: () => {
        this.toastrService.error(
          'Error al obtener los tipos de usuario',
          'Error'
        );
      },
    });
  }

  saveUser() {
    this.editUsuario.tipo_usuario = this.selectedTipoUsuario.filter(
      (tipo) =>
        tipo.idTipoUsuario !== 0 && tipo.nombre_tipo_usuario.trim() !== ''
    );
    this.usuarioService.create(this.editUsuario).subscribe({
      next: () => {
        this.toastrService.success('Usuario agregado correctamente', 'Éxito');
        this.getUsuarios();
        this.toggleModal(4);
      },
      error: () =>
        this.toastrService.error('Error al guardar el usuario', 'Error'),
    });
  }

  updateUser() {
    this.editUsuario.tipo_usuario = this.selectedTipoUsuario.filter(
      (tipo) =>
        tipo.idTipoUsuario !== 0 && tipo.nombre_tipo_usuario.trim() !== ''
    );
    console.log(this.editUsuario);

    this.usuarioService
      .update(this.editUsuario.idUsuario, this.editUsuario)
      .subscribe({
        next: () => {
          this.toastrService.success(
            'Usuario actualizado correctamente',
            'Éxito'
          );
          this.getUsuarios();
          this.toggleModal(4);
        },
        error: () =>
          this.toastrService.error('Error al actualizar el usuario', 'Error'),
      });
  }

  deleteUser() {
    this.usuarioService.delete(this.editUsuario.idUsuario).subscribe({
      next: () => {
        this.toastrService.success('Usuario eliminado correctamente', 'Éxito');
        this.getUsuarios();
        this.toggleModal(4);
      },
      error: () =>
        this.toastrService.error('Error al eliminar el usuario', 'Error'),
    });
  }

  toggleModal(number: number) {
    switch (number) {
      case 2:
        this.updating = true;
        break;
      case 3:
        this.eliminating = true;
        break;
      case 4:
        this.updating = false;
        this.eliminating = false;
        break;
      default:
        this.editUsuario = new UsuarioModel();
        this.cleanData();
        break;
    }
    this.visibleUpdate = !this.visibleUpdate;
  }

  setEditUser(usuario: UsuarioModel) {
    this.editUsuario = { ...usuario };
    this.selectedTipoUsuario = [...usuario.tipo_usuario];
  }

  setDeleteUser(usuario: UsuarioModel) {
    this.editUsuario = usuario;
  }

  // ====== Seleccionar tipo de usuario (evita duplicados)
  selectTipoUsuario(event: TipoUsuarioModel) {
    if (
      !this.selectedTipoUsuario.some(
        (t) => t.idTipoUsuario === event.idTipoUsuario
      )
    ) {
      this.selectedTipoUsuario.push(event);
    }
  }
}
