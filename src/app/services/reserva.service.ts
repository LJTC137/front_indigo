import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaModel } from '../models/reserva.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private URL = variables.api.url + '/reserva';

  constructor(private http: HttpClient) {}

  getList(): Observable<ReservaModel[]> {
    return this.http.get<ReservaModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<ReservaModel> {
    return this.http.get<ReservaModel>(`${this.URL}/${id}`);
  }

  create(data: ReservaModel): Observable<ReservaModel> {
    return this.http.post<ReservaModel>(`${this.URL}`, data);
  }

  update(id: number, data: ReservaModel): Observable<ReservaModel> {
    return this.http.patch<ReservaModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
