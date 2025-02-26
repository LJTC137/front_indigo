import { variables } from 'src/app/variables';

export const navItems = [
  {
    name: 'Modulos',
    title: true,
  },
  //======================== Administración
  {
    name: variables.urls.admin.name,
    url: variables.urls.admin.url,
    iconComponent: { name: 'cil-clipboard' },
    requiredRoles: ['admin'],
  },
  {
    name: variables.urls.rent.name,
    url: variables.urls.rent.url,
    iconComponent: { name: 'cil-cart' },
    children: [
      {
        name: variables.urls.createRent.name,
        url: variables.urls.createRent.url,
      },
      {
        name: variables.urls.listRent.name,
        url: variables.urls.listRent.url,
      },
    ],
  },
];
