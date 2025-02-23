import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuarioModel } from '../models/tipo-usuario.model';

@Injectable({
  providedIn: 'root',
})
export class TipoUsuarioService {
  private URL = variables.api.url + '/tipoUsuario';

  constructor(private http: HttpClient) {}

  getList(): Observable<TipoUsuarioModel[]> {
    return this.http.get<TipoUsuarioModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<TipoUsuarioModel> {
    return this.http.get<TipoUsuarioModel>(`${this.URL}/${id}`);
  }

  create(data: TipoUsuarioModel): Observable<TipoUsuarioModel> {
    return this.http.post<TipoUsuarioModel>(`${this.URL}`, data);
  }

  update(id: number, data: TipoUsuarioModel): Observable<TipoUsuarioModel> {
    return this.http.patch<TipoUsuarioModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
