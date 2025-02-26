import { inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { TokenService } from '../services/token.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isLogged() && tokenService.isAdmin()) {
    return true;
  }
  return router.parseUrl('/rent');
};
