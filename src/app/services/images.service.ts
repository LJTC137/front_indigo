import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private uploadUrl = variables.api.url + '/images/upload';

  constructor(private http: HttpClient) {}

  uploadImages(
    entidadTipo: string,
    entidadId: number,
    files: FileList
  ): Observable<any> {
    const formData = new FormData();
    formData.append('entidadTipo', entidadTipo);
    formData.append('entidadId', entidadId.toString());

    // Agregar todos los archivos
    for (let i = 0; i < files.length; i++) {
      formData.append('imagenes', files[i]);
    }

    return this.http.post(this.uploadUrl, formData);
  }

  findImages(entidadTipo: string, entidadId: number): Observable<any> {
    return this.http.get(
      `${variables.api.url}/images?entidadTipo=${entidadTipo}&entidadId=${entidadId}`
    );
  }
}
