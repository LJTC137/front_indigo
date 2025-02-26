import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { navItems } from './_nav';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavData[] = [];

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    const roles = this.tokenService.getRoles();
    this.navItems = navItems.filter((item) => {
      // Si el ítem tiene la propiedad requiredRoles, verifica si el usuario posee al menos uno
      if ((item as any).requiredRoles) {
        return roles.some((role) => (item as any).requiredRoles.includes(role));
      }
      return true; // Si no se define requiredRoles, se muestra siempre
    });
  }
}
