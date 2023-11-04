import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'tours',
        loadChildren: () => import('./tours/tours.module').then(m => m.ToursModule),
      },
      {
        path: 'tours-form',
        loadChildren: () => import('./tours-form/tours-form.module')
          .then(m => m.ToursFormModule),
      },
      {
        path: 'guides',
        loadChildren: () => import('./guides/guides.module')
          .then(m => m.GuidesModule),
      },
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module')
          .then(m => m.LocationsModule),
      },
      {
        path: '**',
        redirectTo: 'tours',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
