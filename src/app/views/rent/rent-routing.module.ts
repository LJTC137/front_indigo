import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRentComponent } from './list-rent/list-rent.component';
import { FormRentComponent } from './form-rent/form-rent.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reserva',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listRent',
      },
      {
        path: 'listRent',
        component: ListRentComponent,
        data: {
          title: 'Lista de reservas',
        },
      },
      {
        path: 'formRent',
        component: FormRentComponent,
        data: {
          title: 'Formulario de reserva',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentRoutingModule {}
