import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogoModel } from '../models/catalogo.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  private URL = variables.api.url + '/catalogo';

  constructor(private http: HttpClient) {}

  getList(): Observable<CatalogoModel[]> {
    return this.http.get<CatalogoModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<CatalogoModel> {
    return this.http.get<CatalogoModel>(`${this.URL}/${id}`);
  }

  create(data: CatalogoModel): Observable<CatalogoModel> {
    return this.http.post<CatalogoModel>(`${this.URL}`, data);
  }

  update(id: number, data: CatalogoModel): Observable<CatalogoModel> {
    return this.http.patch<CatalogoModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
