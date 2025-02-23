import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalModel } from '../models/local.model';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private URL = variables.api.url + '/local';

  constructor(private http: HttpClient) {}

  getList(): Observable<LocalModel[]> {
    return this.http.get<LocalModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<LocalModel> {
    return this.http.get<LocalModel>(`${this.URL}/${id}`);
  }

  create(data: LocalModel): Observable<LocalModel> {
    return this.http.post<LocalModel>(`${this.URL}`, data);
  }

  update(id: number, data: LocalModel): Observable<LocalModel> {
    return this.http.patch<LocalModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
