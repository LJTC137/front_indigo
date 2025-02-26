import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioModel } from 'src/app/models/login.model';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usuario: LoginUsuarioModel = new LoginUsuarioModel();

  constructor(
    private authService: UsuarioService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.usuario).subscribe({
      next: (data: any) => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        } else {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
