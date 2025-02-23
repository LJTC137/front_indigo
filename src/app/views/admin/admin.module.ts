import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdornosComponent } from './adornos/adornos.component';
import { AsesoresComponent } from './asesores/asesores.component';
import { CateringComponent } from './catering/catering.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { EquipoServicioComponent } from './equipo-servicio/equipo-servicio.component';
import { LocalesComponent } from './locales/locales.component';
import { MontajesComponent } from './montajes/montajes.component';
import { ProductoTecnicoComponent } from './producto-tecnico/producto-tecnico.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminRoutingModule } from './admin-routing.module';
import {
  ButtonModule,
  CardModule,
  CarouselModule,
  FormModule,
  GridModule,
  ModalModule,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ColoresComponent } from './colores/colores.component';

@NgModule({
  declarations: [
    AdornosComponent,
    AsesoresComponent,
    CateringComponent,
    CatalogoComponent,
    EquipoServicioComponent,
    LocalesComponent,
    MontajesComponent,
    ProductoTecnicoComponent,
    UsuariosComponent,
    AdminNavigationComponent,
    ColoresComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GridModule,
    CardModule,
    CarouselModule,
    FormModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    IconModule,
    NgSelectModule,
    TableModule,
    UtilitiesModule,
    ModalModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
