import { CatalogoModel } from "./catalogo.model";

export class ProductoTecnicoModel{
    idProducto: number = 0 ;
    descripcion: string = '';
    esDisponible: boolean = false;
    estado: boolean = true;
    nombre: string = '';
    ubicacionProducto: string = '';
    fechaAdquisicion: Date = new Date();
    capacidadTecnica: string = '';
    estadoEquipo: CatalogoModel = new CatalogoModel();
    tipoProducto: CatalogoModel = new CatalogoModel();
}