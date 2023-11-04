import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllToursPageComponent } from './pages/all-tours-page/all-tours-page.component';
import { TourDetailLayoutComponent } from './pages/tour-detail-layout/tour-detail-layout.component';
import { TourPreviewPageComponent } from './pages/tour-preview-page/tour-preview-page.component';
import { TourBookingsPageComponent } from './pages/tour-bookings-page/tour-bookings-page.component';
import { TourReviewsPageComponent } from './pages/tour-reviews-page/tour-reviews-page.component';

const routes: Routes = [
  {
    component: AllToursPageComponent,
    path: 'all-tours'
  },
  {
    component: TourDetailLayoutComponent,
    path: ':id',
    children: [
      { path: 'preview', component: TourPreviewPageComponent },
      { path: 'bookings', component: TourBookingsPageComponent },
      { path: 'reviews', component: TourReviewsPageComponent },
      { 
        path: 'update',  
        loadChildren: () => import('../update-tour/update-tour.module')
          .then(m => m.UpdateTourModule),
      },
      { path: '**', redirectTo: 'preview' }
    ]
  },
  {
    path: '**', redirectTo: 'all-tours'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
