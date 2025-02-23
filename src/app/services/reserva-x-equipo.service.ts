import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaXEquipoModel } from '../models/reserva-X-equipo.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaXEquipoService {
  private URL = variables.api.url + '/reservaXEquipo';

  constructor(private http: HttpClient) {}

  getList(): Observable<ReservaXEquipoModel[]> {
    return this.http.get<ReservaXEquipoModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<ReservaXEquipoModel> {
    return this.http.get<ReservaXEquipoModel>(`${this.URL}/${id}`);
  }

  create(data: ReservaXEquipoModel): Observable<ReservaXEquipoModel> {
    return this.http.post<ReservaXEquipoModel>(`${this.URL}`, data);
  }

  update(
    id: number,
    data: ReservaXEquipoModel
  ): Observable<ReservaXEquipoModel> {
    return this.http.patch<ReservaXEquipoModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
