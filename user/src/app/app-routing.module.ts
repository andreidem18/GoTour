import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'tours',
        loadChildren: () => import('./tours/tours.module').then(m => m.ToursModule),
      },
      {
        path: 'tour',
        loadChildren: () => import('./tour-detail/tour-detail.module')
          .then(m => m.TourDetailModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'bookings',
        loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule),
        canActivate: [isAuthenticatedGuard]
      },
      {
        path: 'reviews',
        loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule),
        canActivate: [isAuthenticatedGuard]
      },
      {
        path: '**',
        redirectTo: 'tours'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
