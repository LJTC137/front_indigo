import { CanActivateFn, Router } from '@angular/router';
//import { enlace } from '../enlace';
import { Inject, inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // const currentUser = sessionStorage.getItem(enlace.nameSession);
  // const router = inject(Router);
  // if (currentUser && currentUser.length > 0) {
  //   return true;
  // }else {
  //   router.navigate(["../../"+enlace.urls.logIn.url]);
  //   return false;
  // }
  return true;
};
