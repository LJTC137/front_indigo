import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { LoginUsuarioModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private URL = variables.api.url + '/usuario';

  constructor(private http: HttpClient) {}

  getList(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.URL}/${id}`);
  }

  create(data: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.URL}`, data);
  }

  update(id: number, data: UsuarioModel): Observable<UsuarioModel> {
    return this.http.patch<UsuarioModel>(`${this.URL}/${id}`, data);
  }

  public login(dto: LoginUsuarioModel): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/login', dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
