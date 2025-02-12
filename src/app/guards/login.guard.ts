import { CanActivateFn } from '@angular/router';
// import { enlace } from '../enlace';

export const loginGuard: CanActivateFn = (route, state) => {
  // const currentUser = sessionStorage.getItem(enlace.nameSession);
  // if (currentUser && currentUser.length > 0) {
  //   return false;
  // }else {
  //   return true;
  // }
  return true;
};
