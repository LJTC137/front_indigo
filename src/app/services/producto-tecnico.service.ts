import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoTecnicoModel } from '../models/producto-tecnico.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoTecnicoService {
  private URL = variables.api.url + '/productoTecnico';

  constructor(private http: HttpClient) {}

  getList(): Observable<ProductoTecnicoModel[]> {
    return this.http.get<ProductoTecnicoModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<ProductoTecnicoModel> {
    return this.http.get<ProductoTecnicoModel>(`${this.URL}/${id}`);
  }

  create(data: ProductoTecnicoModel): Observable<ProductoTecnicoModel> {
    return this.http.post<ProductoTecnicoModel>(`${this.URL}`, data);
  }

  update(
    id: number,
    data: ProductoTecnicoModel
  ): Observable<ProductoTecnicoModel> {
    return this.http.patch<ProductoTecnicoModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
