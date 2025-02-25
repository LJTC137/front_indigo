import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { ReservaModel } from 'src/app/models/reserva.model';
import { ReservaService } from 'src/app/services/reserva.service';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-list-rent',
  templateUrl: './list-rent.component.html',
  styleUrls: ['./list-rent.component.scss'],
})
export class ListRentComponent implements OnInit {
  rutas = variables;
  icons = freeSet;
  //====== Reserva
  reservaList: ReservaModel[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {}
}
