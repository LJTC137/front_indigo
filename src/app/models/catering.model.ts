import { CatalogoModel } from "./catalogo.model";

export class CateringModel {
  idCatering: number = 0;
  nombreServicio: string = '';
  descripcion: string = '';
  precioXPersona: number = 0;
  estado: boolean = true;
  tipoCatering: CatalogoModel = new CatalogoModel();
}
