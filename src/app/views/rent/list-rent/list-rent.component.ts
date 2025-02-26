import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  reservaList: ReservaModel[] = [];

  constructor(private reservaService: ReservaService, private router: Router) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservaService.getList().subscribe({
      next: (data: ReservaModel[]) => {
        this.reservaList = data;
      },
      error: (error) => {
        console.error('Error al cargar reservas', error);
      },
    });
  }

  editReserva(reserva: ReservaModel) {
    this.router.navigate(['/rent/formRent'], { state: reserva });
  }
}
