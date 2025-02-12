import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administración',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-navigation',
      },
      {
        path: 'admin-navigation',
        component: AdminNavigationComponent,
        data: {
          title: 'Navegación',
        },
      },
      {
        path: 'decorations',
        component: AdornosComponent,
        data: {
          title: 'Adornos',
        },
      },
      {
        path: 'advisors',
        component: AsesoresComponent,
        data: {
          title: 'Adornos',
        },
      },
      {
        path: 'catering',
        component: CateringComponent,
        data: {
          title: 'Catering',
        },
      },
      {
        path: 'categories',
        component: CatalogoComponent,
        data: {
          title: 'Catalogo',
        },
      },
      {
        path: 'serviceTeams',
        component: EquipoServicioComponent,
        data: {
          title: 'Equipos de servicio',
        },
      },
      {
        path: 'locals',
        component: LocalesComponent,
        data: {
          title: 'Locales',
        },
      },
      {
        path: 'setUps',
        component: MontajesComponent,
        data: {
          title: 'Montajes',
        },
      },
      {
        path: 'technicalProducts',
        component: ProductoTecnicoComponent,
        data: {
          title: 'Productos técnicos',
        },
      },
      {
        path: 'users',
        component: UsuariosComponent,
        data: {
          title: 'Usuarios',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
