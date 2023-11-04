import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToursFormLayoutComponent } from './pages/tours-form-layout/tours-form-layout.component';
import { BasicInfoPageComponent } from './pages/basic-info-page/basic-info-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { TourImagesPageComponent } from './pages/tour-images-page/tour-images-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';

const routes: Routes = [
  {
    path: '',
    component: ToursFormLayoutComponent,
    children: [
      { path: 'basic-info', component: BasicInfoPageComponent },
      { path: 'details', component: DetailsPageComponent },
      { path: 'tour-images', component: TourImagesPageComponent },
      { path: 'confirmation', component: ConfirmationPageComponent },
      { path: '**', redirectTo: 'basic-info'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursFormRoutingModule { }
