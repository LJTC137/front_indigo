import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNameUser(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombre_usuario = valuesJson?.nombres;

    return nombre_usuario || null;
  }

  getIdUser(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const id_usuario = valuesJson?.id_usuario;
    return id_usuario || null;
  }

  isAdmin(): boolean | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson?.roles;

    if (roles && roles.indexOf('admin') >= 0) {
      return true;
    }
    return false;
  }

  logOut(): void {
    localStorage.clear();
  }
}
