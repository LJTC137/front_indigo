import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdornoXReservaModel } from '../models/adorno-X-reserva.model';
import { variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class AdornoXReservaService {
  private URL = variables.api.url + '/adornoXReserva';

  constructor(private http: HttpClient) {}

  getList(): Observable<AdornoXReservaModel[]> {
    return this.http.get<AdornoXReservaModel[]>(`${this.URL}`);
  }

  getByAlquilerId(id: number): Observable<AdornoXReservaModel> {
    return this.http.get<AdornoXReservaModel>(`${this.URL}/${id}`);
  }

  create(data: AdornoXReservaModel): Observable<AdornoXReservaModel> {
    return this.http.post<AdornoXReservaModel>(`${this.URL}`, data);
  }

  update(
    id: number,
    data: AdornoXReservaModel
  ): Observable<AdornoXReservaModel> {
    return this.http.patch<AdornoXReservaModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
