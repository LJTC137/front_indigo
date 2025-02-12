import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EquipoServicioModel } from '../models/equipo-servicio.model';

@Injectable({
  providedIn: 'root',
})
export class EquipoServicioService {
  private URL = variables.api.url + 'equipoServicio';

  constructor(private http: HttpClient) {}

  getList(): Observable<EquipoServicioModel[]> {
    return this.http.get<EquipoServicioModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<EquipoServicioModel> {
    return this.http.get<EquipoServicioModel>(`${this.URL}/${id}`);
  }

  create(data: EquipoServicioModel): Observable<EquipoServicioModel> {
    return this.http.post<EquipoServicioModel>(`${this.URL}`, data);
  }

  update(
    id: number,
    data: EquipoServicioModel
  ): Observable<EquipoServicioModel> {
    return this.http.patch<EquipoServicioModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
