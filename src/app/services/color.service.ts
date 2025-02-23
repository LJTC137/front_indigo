import { Injectable } from '@angular/core';
import { variables } from '../variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColorModel } from '../models/color.model';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private URL = variables.api.url + '/color';

  constructor(private http: HttpClient) {}

  getList(): Observable<ColorModel[]> {
    return this.http.get<ColorModel[]>(`${this.URL}`);
  }

  getById(id: number): Observable<ColorModel> {
    return this.http.get<ColorModel>(`${this.URL}/${id}`);
  }

  create(data: ColorModel): Observable<ColorModel> {
    return this.http.post<ColorModel>(`${this.URL}`, data);
  }

  update(id: number, data: ColorModel): Observable<ColorModel> {
    return this.http.patch<ColorModel>(`${this.URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
