import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private URL = variables.api.url + 'images';

  constructor(private http: HttpClient) {}

  getList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.URL}`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
