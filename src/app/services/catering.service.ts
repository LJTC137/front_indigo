import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CateringModel } from '../models/catering.model';

@Injectable({
  providedIn: 'root',
})
export class CateringService {
  private URL = variables.api.url + 'catering';

  constructor(private http: HttpClient) {}

  getList(): Observable<CateringModel[]> {
    return this.http.get<CateringModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<CateringModel> {
    return this.http.get<CateringModel>(`${this.URL}/${id}`);
  }

  create(data: CateringModel): Observable<CateringModel> {
    return this.http.post<CateringModel>(`${this.URL}`, data);
  }

  update(id: number, data: CateringModel): Observable<CateringModel> {
    return this.http.patch<CateringModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
