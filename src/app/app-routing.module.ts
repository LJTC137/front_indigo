import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';

import { Page404Component } from './views/pages/page404/page404.component';
import { LoginComponent } from './views/pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rent',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [authGuard],
    data: {
      title: 'Inicio',
    },
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/admin/admin.module').then((m) => m.AdminModule),
        canActivateChild: [authGuard, adminGuard],
      },
      {
        path: 'rent',
        loadChildren: () =>
          import('./views/rent/rent.module').then((m) => m.RentModule),
        canActivateChild: [authGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Iniciar Sesión',
    },
    canActivate: [loginGuard],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
