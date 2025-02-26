import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HeaderComponent } from '@coreui/angular';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  icons = freeSet;
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(private tokenService: TokenService, private router: Router) {
    super();
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
}
