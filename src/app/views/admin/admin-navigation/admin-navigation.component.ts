import { Component } from '@angular/core';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss'],
})
export class AdminNavigationComponent {
  rutas = variables;
}
