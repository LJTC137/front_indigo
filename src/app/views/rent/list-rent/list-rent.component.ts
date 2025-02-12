import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { ReservaModel } from 'src/app/models/reserva.model';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-list-rent',
  templateUrl: './list-rent.component.html',
  styleUrls: ['./list-rent.component.scss'],
})
export class ListRentComponent {
  rutas = variables;
  icons = freeSet;
  //====== Reserva
  reservaList: ReservaModel[] = [];
}
