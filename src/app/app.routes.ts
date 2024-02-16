import { Routes } from '@angular/router';

export const routes: Routes = [
  //   {
  //     path: '',
  //     redirectTo: 'event-list',
  //     pathMatch: 'full',
  //   },
  //   {
  //     path: 'event-list',
  //     loadComponent: () =>
  //       import('./pages/event-list/event-list.component').then(
  //         (c) => c.EventListComponent
  //       ),
  //   },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/event/event.component').then((c) => c.EventComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
