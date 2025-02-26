import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Iniciar Sesión',
    },
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
