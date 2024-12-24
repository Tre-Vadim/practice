import { lazy } from 'react';

export const ROUTES = [
  {
    id: 1,
    path: '/',
    component: lazy(() => import('../pages/home')),
    menuLabel: 'Home'
  },
  {
    id: 2,
    path: '/intersection-observer',
    component: lazy(() => import('../pages/intersection-observer')),
    menuLabel: 'Intersection Observer'
  }
];
