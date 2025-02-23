import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { Observable } from 'rxjs';
import { AdornoModel } from '../models/adorno.model';

@Injectable({
  providedIn: 'root',
})
export class AdornoService {
  private URL = variables.api.url + '/adorno';

  constructor(private httpClient: HttpClient) {}

  getList(): Observable<AdornoModel[]> {
    return this.httpClient.get<AdornoModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<AdornoModel> {
    return this.httpClient.get<AdornoModel>(`${this.URL}/${id}`);
  }

  create(data: AdornoModel): Observable<any> {
    return this.httpClient.post<AdornoModel>(`${this.URL}`, data);
  }

  update(id: number, data: AdornoModel): Observable<AdornoModel> {
    return this.httpClient.patch<AdornoModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/${id}`);
  }
}
