import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsesorModel } from '../models/asesor.model';

@Injectable({
  providedIn: 'root',
})
export class AsesorService {
  private URL = variables.api.url + 'asesor';

  constructor(private http: HttpClient) {}

  getList(): Observable<AsesorModel[]> {
    return this.http.get<AsesorModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<AsesorModel> {
    return this.http.get<AsesorModel>(`${this.URL}/${id}`);
  }

  create(data: AsesorModel): Observable<AsesorModel> {
    return this.http.post<AsesorModel>(`${this.URL}`, data);
  }

  update(id: number, data: AsesorModel): Observable<AsesorModel> {
    return this.http.patch<AsesorModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
