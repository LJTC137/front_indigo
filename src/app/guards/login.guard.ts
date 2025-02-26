/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class loginGuard {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('LoginGuard - isLogged():', this.tokenService.isLogged());
    if (this.tokenService.isLogged()) {
      this.router.navigate(['/rent']);
      return false;
    }
    return true;
  }
}
