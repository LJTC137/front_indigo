import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { freeSet } from '@coreui/icons';
import { ToastrService } from 'ngx-toastr';
import { AdornoXReservaModel } from 'src/app/models/adorno-X-reserva.model';
import { AdornoModel } from 'src/app/models/adorno.model';
import { AsesorModel } from 'src/app/models/asesor.model';
import { CatalogoModel } from 'src/app/models/catalogo.model';
import { CateringModel } from 'src/app/models/catering.model';
import { ColorModel } from 'src/app/models/color.model';
import { EquipoServicioModel } from 'src/app/models/equipo-servicio.model';
import { ImageModel } from 'src/app/models/image.model';
import { LocalModel } from 'src/app/models/local.model';
import { MontajeModel } from 'src/app/models/montaje.model';
import { ProductoTecnicoModel } from 'src/app/models/producto-tecnico.model';
import { ReservaXEquipoModel } from 'src/app/models/reserva-X-equipo.model';
import { ReservaModel } from 'src/app/models/reserva.model';
import { AdornoXReservaService } from 'src/app/services/adorno-x-reserva.service';
import { AdornoService } from 'src/app/services/adorno.service';
import { AsesorService } from 'src/app/services/asesor.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { CateringService } from 'src/app/services/catering.service';
import { EquipoServicioService } from 'src/app/services/equipo-servicio.service';
import { ImageService } from 'src/app/services/images.service';
import { LocalService } from 'src/app/services/local.service';
import { MontajeService } from 'src/app/services/montaje.service';
import { ProductoTecnicoService } from 'src/app/services/producto-tecnico.service';
import { ReservaXEquipoService } from 'src/app/services/reserva-x-equipo.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-form-rent',
  templateUrl: './form-rent.component.html',
  styleUrls: ['./form-rent.component.scss'],
})
export class FormRentComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  visible = false;
  isUpdating: boolean = false;
  auxListadoAdornos: any = [];
  auxListadoEquipos: any = [];
  //============== Asesor
  asesorList: AsesorModel[] = [];
  auxAsesor: AsesorModel = new AsesorModel();
  //============== Adornos
  adornosList: AdornoModel[] = [];
  auxAdorno: AdornoModel = new AdornoModel();
  colorList: ColorModel[] = [];
  auxColor: ColorModel = new ColorModel();
  selectedAdornos: AdornoXReservaModel[] = [];
  //============== Catalogo
  tipoEventoList: CatalogoModel[] = [];
  estadoReservaList: CatalogoModel[] = [];
  auxTipoReserva: CatalogoModel = new CatalogoModel();
  auxEstadoReserva: CatalogoModel = new CatalogoModel();
  //============== Producto tecnico
  productoList: ProductoTecnicoModel[] = [];
  auxProducto: ProductoTecnicoModel = new ProductoTecnicoModel();
  selectedProducto: ProductoTecnicoModel[] = [];
  //============== Catering
  cateringList: CateringModel[] = [];
  auxCatering: CateringModel = new CateringModel();
  selectedCatering: CateringModel[] = [];
  //============== Equipo servicio
  equipoList: EquipoServicioModel[] = [];
  selectedEquipo: ReservaXEquipoModel[] = [];
  auxEquipo: EquipoServicioModel = new EquipoServicioModel();
  //============== Montaje
  montajeList: MontajeModel[] = [];
  auxMontaje: MontajeModel = new MontajeModel();
  //============== Local
  localList: LocalModel[] = [];
  auxLocal: LocalModel = new LocalModel();
  //============== Bools
  chooseAsesor: boolean = false;
  chooseAdornos: boolean = false;
  chooseProductos: boolean = false;
  chooseCatering: boolean = false;
  chooseEquipo: boolean = false;
  chooseLocal: boolean = false;
  chooseMontaje: boolean = false;
  isShowingGallery: boolean = false;
  esCostoPack: boolean = false;
  esLocalPorDia: boolean = false;
  //============== Imagen
  imageList: ImageModel[] = [];
  //============== Reserva
  reserva: ReservaModel = new ReservaModel();
  //============== Adorno-reserva
  adornoReserva: AdornoXReservaModel = new AdornoXReservaModel();
  //============== Reserva-equipo
  equipoReserva: ReservaXEquipoModel = new ReservaXEquipoModel();
  //============== Number
  costoAsesor: number = 0;
  costoProducto: number = 0;
  costoLocal: number = 0;

  constructor(
    private asesorService: AsesorService,
    private adornosService: AdornoService,
    private catalogoService: CatalogoService,
    private cateringService: CateringService,
    private equipoService: EquipoServicioService,
    private montajeService: MontajeService,
    private productoService: ProductoTecnicoService,
    private localService: LocalService,
    private imageService: ImageService,
    private router: Router,
    private reservaService: ReservaService,
    private reservaEquipo: ReservaXEquipoService,
    private reservaAdorno: AdornoXReservaService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdornosList();
    this.getAsesorList();
    this.getCatalogoList();
    this.getCateringList();
    this.getProductoList();
    this.getEquipoList();
    this.getMontajeList();
    this.getLocalList();
    console.log(history.state);

    if (history.state) {
      this.isUpdating = true;
      this.reserva = history.state;
      this.selectedAdornos = history.state.alquilerAdorno;
      this.selectedEquipo = history.state.alquilerEquipo;
      this.auxAsesor = this.reserva.asesor;
      this.selectedProducto = history.state.reservaProducto;
      this.selectedCatering = history.state.reservaCatering;
      this.auxMontaje = this.reserva.montaje;
      this.auxLocal = this.reserva.local;
      this.auxTipoReserva = this.reserva.tipoEvento;
      this.auxEstadoReserva = this.reserva.estadoReserva;
    } else {
      this.reserva = new ReservaModel();
    }
  }

  private getAsesorList() {
    this.asesorService.getList().subscribe({
      next: (data: AsesorModel[]) => {
        this.asesorList = data.filter((as) => as.esDisponible === true);
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getLocalList() {
    this.localService.getList().subscribe({
      next: (data: LocalModel[]) => {
        this.localList = data.filter(
          (l) =>
            l.estadoDisponibilidad.valorCatalogo.toLowerCase() === 'disponible'
        );
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getAdornosList() {
    this.adornosService.getList().subscribe({
      next: (data: AdornoModel[]) => {
        this.adornosList = data.filter((ad) => ad.cantidad !== 0);
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getCatalogoList() {
    this.catalogoService.getList().subscribe({
      next: (data: CatalogoModel[]) => {
        this.tipoEventoList = data.filter(
          (te) => te.nombreCatalogo === 'Tipo evento'
        );
        this.estadoReservaList = data.filter(
          (er) => er.nombreCatalogo === 'Estado reserva'
        );
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getCateringList() {
    this.cateringService.getList().subscribe({
      next: (data: CateringModel[]) => {
        this.cateringList = data;
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getProductoList() {
    this.productoService.getList().subscribe({
      next: (data: ProductoTecnicoModel[]) => {
        this.productoList = data.filter((er) => er.esDisponible === true);
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getEquipoList() {
    this.equipoService.getList().subscribe({
      next: (data: EquipoServicioModel[]) => {
        this.equipoList = data.filter((e) => e.esDisponible === true);
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  private getMontajeList() {
    this.montajeService.getList().subscribe({
      next: (data: MontajeModel[]) => {
        this.montajeList = data.filter((m) => m.esDisponible === true);
      },
      error: (error) => {
        this.toastrService.error(error, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  changeCosto() {
    this.esCostoPack = !this.esCostoPack;
  }

  calcularCostoTotal() {
    // 1. Calcular costo de montaje
    let costoMontaje = 0;
    if (this.esCostoPack) {
      costoMontaje =
        this.reserva.cantidadSillas * this.auxMontaje.costoSilla +
        this.reserva.cantidadMesas * this.auxMontaje.costoMesa;
    } else {
      costoMontaje =
        this.reserva.cantidadPack * this.auxMontaje.costoPack +
        this.auxMontaje.depositoReembolsable;
    }

    // 2. Calcular costo de adornos
    let costoAdornos = 0;
    if (this.selectedAdornos && this.selectedAdornos.length > 0) {
      this.selectedAdornos.forEach((adornoReserva) => {
        costoAdornos +=
          adornoReserva.adorno.precioUnitario * adornoReserva.cantidadAdornos;
      });
    }

    // 3. Calcular costo de catering
    let costoCatering = 0;
    if (this.selectedCatering && this.selectedCatering.length > 0) {
      this.selectedCatering.forEach((catering) => {
        costoCatering +=
          catering.precioXPersona * this.reserva.cantidadPersonas;
      });
    }

    // 4. Calcular costo de equipo
    let costoEquipo = 0;
    if (this.selectedEquipo && this.selectedEquipo.length > 0) {
      this.selectedEquipo.forEach((equipoReserva) => {
        if (equipoReserva.horaXServicio === 0) {
          costoEquipo += equipoReserva.equipo.precioXHora;
        } else {
          costoEquipo += equipoReserva.equipo.tarifaXEvento;
        }
      });
    }

    // 5. Costo de servicio: suma de catering y equipo
    let costoServicio = costoCatering + costoEquipo;

    // 6. Calcular costo de producto tecnológico
    let costoProducto = 0;
    if (this.selectedProducto && this.selectedProducto.length > 0) {
      this.selectedProducto.forEach((producto) => {
        const tipo = producto.tipoProducto.valorCatalogo.toLowerCase();
        if (tipo === 'sonido') {
          costoProducto += 20;
        } else if (tipo === 'proyeccion') {
          costoProducto += 40;
        } else if (tipo === 'escenario') {
          costoProducto += 100;
        }
      });
    }

    // 7. Calcular costo del asesor (100 por evento)
    let costoAsesor = 0;
    if (this.auxAsesor) {
      costoAsesor = 100;
    }

    // 8. Calcular costo del local
    let costoLocal = 0;
    if (this.auxLocal) {
      if (this.esLocalPorDia) {
        // Calcular diferencia en días entre fechaInicioEvento y fechaFinEvento
        const startDate = new Date(this.reserva.fechaInicioEvento);
        const endDate = new Date(this.reserva.fechaFinEvento);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        diffDays = diffDays > 0 ? diffDays : 1;
        costoLocal = diffDays * this.auxLocal.tarifaXDia;
      } else {
        // Calcular diferencia en horas entre horaInicio y horaFin
        const [startHour, startMinute] = this.reserva.horaInicio
          .split(':')
          .map(Number);
        const [endHour, endMinute] = this.reserva.horaFin
          .split(':')
          .map(Number);
        const startTime = new Date(0, 0, 0, startHour, startMinute);
        const endTime = new Date(0, 0, 0, endHour, endMinute);
        let diffMs = endTime.getTime() - startTime.getTime();
        if (diffMs < 0) {
          diffMs += 24 * 60 * 60 * 1000;
        }
        const diffHours = diffMs / (1000 * 60 * 60);
        costoLocal = diffHours * this.auxLocal.tarifaXHora;
      }
    }

    // 9. Calcular costo total final
    const costoTotal =
      costoMontaje +
      costoAdornos +
      costoServicio +
      costoProducto +
      costoAsesor +
      costoLocal;

    // Actualizar el modelo de reserva
    this.reserva.costoMontaje = costoMontaje;
    this.reserva.costoAdornos = costoAdornos;
    this.reserva.costoServicio = costoServicio;
    this.costoAsesor = costoAsesor;
    this.costoProducto = costoProducto;
    this.costoLocal = costoLocal;
    this.reserva.costoTotal = costoTotal;

    console.log('Costos calculados:', {
      costoMontaje,
      costoAdornos,
      costoServicio,
      costoProducto,
      costoAsesor,
      costoLocal,
      costoTotal,
    });
  }

  selectionModal(option: string) {
    switch (option) {
      case 'asesor':
        this.chooseAsesor = true;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      case 'adornos':
        this.chooseAsesor = false;
        this.chooseAdornos = true;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      case 'productos':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = true;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      case 'catering':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = true;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      case 'equipo':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = true;
        this.chooseLocal = false;
        this.chooseMontaje = false;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      case 'local':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = true;
        this.chooseMontaje = false;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      case 'montaje':
        this.chooseAsesor = false;
        this.chooseAdornos = false;
        this.chooseProductos = false;
        this.chooseCatering = false;
        this.chooseEquipo = false;
        this.chooseLocal = false;
        this.chooseMontaje = true;
        this.isShowingGallery = true;
        this.cleanSelectedFiles();
        break;
      default:
        this.cleanSelectedFiles();
    }
    this.toggleModal();
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

  selectedFiles: FileList | null = null;

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles = target.files;
    }
  }

  cleanSelectedFiles() {
    this.imageList = [];
    this.selectedFiles = null;
  }

  findImages(entidad: any, id: number) {
    this.imageService.findImages(entidad, id).subscribe({
      next: (data) => {
        this.imageList = data.map((img: any) => {
          const fullUrl = `${variables.api.url.replace(/\/$/, '')}${img.url}`;
          return { ...img, url: fullUrl };
        });
      },
      error: (error) => {
        console.error('Error al obtener imágenes:', error);
      },
    });
  }

  selectAsesor(asesor: AsesorModel) {
    this.cleanSelectedFiles();
    this.findImages('asesor', asesor.idAsesor);
  }

  selectAdorno(adorno: AdornoModel) {
    this.cleanSelectedFiles();
    this.findImages('adorno', adorno.idAdorno);
  }

  selectProducto(producto: ProductoTecnicoModel) {
    this.cleanSelectedFiles();
    this.findImages('producto', producto.idProducto);
  }

  selectCatering(catering: CateringModel) {
    this.cleanSelectedFiles();
    this.findImages('catering', catering.idCatering);
  }

  selectEquipo(equipo: EquipoServicioModel) {
    this.findImages('equipo', equipo.idEquipo);
  }

  selectMontaje(montaje: MontajeModel) {
    this.cleanSelectedFiles();
    this.findImages('montaje', montaje.idMontaje);
  }

  selectLocal(local: LocalModel) {
    this.cleanSelectedFiles();
    this.findImages('local', local.idLocal);
  }

  agregarAdorno() {
    const nuevoAdorno = new AdornoXReservaModel();
    nuevoAdorno.adorno = this.auxAdorno;
    nuevoAdorno.cantidadAdornos = this.adornoReserva.cantidadAdornos;
    nuevoAdorno.color = this.auxColor.hexadecimal;
    this.selectedAdornos.push(nuevoAdorno);
  }

  quitarAdorno(index: number) {
    if (index >= 0 && index < this.selectedAdornos.length) {
      this.selectedAdornos.splice(index, 1);
    }
  }

  agregarProducto() {
    this.selectedProducto.push(this.auxProducto);
  }

  quitarProducto(index: number) {
    if (index >= 0 && index < this.selectedProducto.length) {
      this.selectedProducto.splice(index, 1);
    }
  }

  agregarEquipo() {
    const nuevoEquipo = new ReservaXEquipoModel();
    nuevoEquipo.equipo = this.auxEquipo;
    nuevoEquipo.horaXServicio = this.equipoReserva.horaXServicio;
    this.selectedEquipo.push(nuevoEquipo);
  }

  quitarEquipo(index: number) {
    if (index >= 0 && index < this.selectedEquipo.length) {
      this.selectedEquipo.splice(index, 1);
    }
  }

  agregarCatering() {
    this.selectedCatering.push(this.auxCatering);
  }

  quitarCatering(index: number) {
    if (index >= 0 && index < this.selectedCatering.length) {
      this.selectedCatering.splice(index, 1);
    }
  }
  changeCobroLocal() {
    this.esLocalPorDia = !this.esLocalPorDia;
  }

  saveRent() {
    this.reserva.asesor = this.auxAsesor;
    this.reserva.reservaCatering = this.selectedCatering;
    this.reserva.local = this.auxLocal;
    this.reserva.montaje = this.auxMontaje;
    this.reserva.reservaProducto = this.selectedProducto;
    this.reserva.tipoEvento = this.auxTipoReserva;
    this.reserva.estadoReserva = this.auxEstadoReserva;
    this.reservaService.create(this.reserva).subscribe({
      next: (response) => {
        const reservaId = response.entityId;
        // Guardar cada relación con adorno:
        this.selectedAdornos.forEach((adornoReserva) => {
          adornoReserva.reserva.idReserva = reservaId;
          this.reservaAdorno.create(adornoReserva).subscribe({
            next: (response) => {
              console.log('Adorno guardado', response);
            },
            error: (error) => {
              console.error('Error guardando adorno', error);
            },
          });
        });

        // Guardar cada relación con equipo:
        this.selectedEquipo.forEach((equipoReserva) => {
          equipoReserva.reserva.idReserva = reservaId;
          this.reservaEquipo.create(equipoReserva).subscribe({
            next: (response) => {
              console.log('Equipo guardado', response);
            },
            error: (error) => {
              console.error('Error guardando equipo', error);
            },
          });
        });

        // Muestra un mensaje de éxito y redirige
        this.toastrService.success('Reserva creada exitosamente');
        this.router.navigate(['/rent']);
      },
      error: (error) => {
        this.toastrService.error('Error al guardar la reserva', 'Error');
      },
    });
  }

  updateRent() {
    this.reserva.asesor = this.auxAsesor;
    this.reserva.reservaCatering = this.selectedCatering;
    this.reserva.local = this.auxLocal;
    this.reserva.montaje = this.auxMontaje;
    this.reserva.tipoEvento = this.auxTipoReserva;
    this.reserva.estadoReserva = this.auxEstadoReserva;
    this.reserva.reservaProducto = this.selectedProducto;

    const payload: Partial<ReservaModel> = {
      idReserva: this.reserva.idReserva,
      nombreClienteReserva: this.reserva.nombreClienteReserva,
      identificacionClienteReserva: this.reserva.identificacionClienteReserva,
      telefonoClienteReserva: this.reserva.telefonoClienteReserva,
      cantidadPersonas: this.reserva.cantidadPersonas,
      horaInicio: this.reserva.horaInicio,
      horaFin: this.reserva.horaFin,
      fechaInicioEvento: this.reserva.fechaInicioEvento,
      fechaFinEvento: this.reserva.fechaFinEvento,
      asesor: this.reserva.asesor,
      tipoEvento: this.reserva.tipoEvento,
      estadoReserva: this.reserva.estadoReserva,
      local: this.reserva.local,
      montaje: this.reserva.montaje,
      fechaRegistro: this.reserva.fechaRegistro,
      cantidadSillas: this.reserva.cantidadSillas,
      cantidadMesas: this.reserva.cantidadMesas,
      cantidadPack: this.reserva.cantidadPack,
      costoMontaje: this.reserva.costoMontaje,
      costoAdornos: this.reserva.costoAdornos,
      costoServicio: this.reserva.costoServicio,
      costoTotal: this.reserva.costoTotal,
      estado: this.reserva.estado,
    };

    this.reservaService.update(this.reserva.idReserva, payload).subscribe({
      next: (response) => {
        this.toastrService.success('Reserva actualizada exitosamente');
        this.router.navigate(['/rent']);
      },
      error: (error) => {
        this.toastrService.error('Error al actualizar la reserva', 'Error');
      },
    });
  }
}
