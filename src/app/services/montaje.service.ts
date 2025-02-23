import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MontajeModel } from '../models/montaje.model';

@Injectable({
  providedIn: 'root',
})
export class MontajeService {
  private URL = variables.api.url + '/montaje';

  constructor(private http: HttpClient) {}

  getList(): Observable<MontajeModel[]> {
    return this.http.get<MontajeModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<MontajeModel> {
    return this.http.get<MontajeModel>(`${this.URL}/${id}`);
  }

  create(data: MontajeModel): Observable<MontajeModel> {
    return this.http.post<MontajeModel>(`${this.URL}`, data);
  }

  update(id: number, data: MontajeModel): Observable<MontajeModel> {
    return this.http.patch<MontajeModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
