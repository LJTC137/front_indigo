import { CatalogoModel } from "./catalogo.model";
import { ColorModel } from "./color.model";

export class AdornoModel {
  idAdorno: number = 0;
  descripcion: string = '';
  nombre: string = '';
  estado: boolean = false;
  dimensiones: string = '';
  precioUnitario: number = 0;
  cantidad: number = 0;
  tipoAdorno: CatalogoModel = new CatalogoModel();
  adornoColor: ColorModel[] = []
}
